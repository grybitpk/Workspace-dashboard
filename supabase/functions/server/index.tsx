import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const app = new Hono();

// Create Supabase clients
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Helper to get authenticated user
async function getAuthUser(authHeader: string | null) {
  if (!authHeader) return null;
  const token = authHeader.replace('Bearer ', '');
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  return error ? null : user;
}

// Health check endpoint
app.get("/make-server-decdc163/health", (c) => {
  return c.json({ status: "ok" });
});

// Auth endpoints
app.post("/make-server-decdc163/auth/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name }
    });

    if (error) {
      return c.json({ error: error.message }, 400);
    }

    // Create user settings and stats
    await kv.set(`user_settings:${data.user.id}`, {
      user_id: data.user.id,
      theme_index: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    await kv.set(`user_stats:${data.user.id}`, {
      user_id: data.user.id,
      total_clicks: 0,
      clicks_this_week: 0,
      clicks_last_week: 0,
      last_reset_date: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    return c.json({ user: data.user });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: 'Failed to create account' }, 500);
  }
});

// User tools endpoints
app.get("/make-server-decdc163/tools", async (c) => {
  const user = await getAuthUser(c.req.header('Authorization') || null);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const tools = await kv.getByPrefix(`tool:${user.id}:`);
    return c.json({ tools: tools || [] });
  } catch (error) {
    console.error('Get tools error:', error);
    return c.json({ error: 'Failed to fetch tools' }, 500);
  }
});

app.post("/make-server-decdc163/tools", async (c) => {
  const user = await getAuthUser(c.req.header('Authorization') || null);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const tool = await c.req.json();
    const toolId = `tool:${user.id}:${tool.id}`;
    const toolData = {
      ...tool,
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    await kv.set(toolId, toolData);
    return c.json({ tool: toolData });
  } catch (error) {
    console.error('Create tool error:', error);
    return c.json({ error: 'Failed to create tool' }, 500);
  }
});

app.put("/make-server-decdc163/tools/:id", async (c) => {
  const user = await getAuthUser(c.req.header('Authorization') || null);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const toolId = `tool:${user.id}:${c.req.param('id')}`;
    const updates = await c.req.json();
    const existing = await kv.get(toolId);

    if (!existing) {
      return c.json({ error: 'Tool not found' }, 404);
    }

    const updated = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString()
    };

    await kv.set(toolId, updated);
    return c.json({ tool: updated });
  } catch (error) {
    console.error('Update tool error:', error);
    return c.json({ error: 'Failed to update tool' }, 500);
  }
});

app.delete("/make-server-decdc163/tools/:id", async (c) => {
  const user = await getAuthUser(c.req.header('Authorization') || null);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const toolId = `tool:${user.id}:${c.req.param('id')}`;
    await kv.del(toolId);
    return c.json({ success: true });
  } catch (error) {
    console.error('Delete tool error:', error);
    return c.json({ error: 'Failed to delete tool' }, 500);
  }
});

// User settings endpoints
app.get("/make-server-decdc163/settings", async (c) => {
  const user = await getAuthUser(c.req.header('Authorization') || null);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const settings = await kv.get(`user_settings:${user.id}`);
    return c.json({ settings });
  } catch (error) {
    console.error('Get settings error:', error);
    return c.json({ error: 'Failed to fetch settings' }, 500);
  }
});

app.put("/make-server-decdc163/settings", async (c) => {
  const user = await getAuthUser(c.req.header('Authorization') || null);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const updates = await c.req.json();
    const existing = await kv.get(`user_settings:${user.id}`);
    const settings = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString()
    };

    await kv.set(`user_settings:${user.id}`, settings);
    return c.json({ settings });
  } catch (error) {
    console.error('Update settings error:', error);
    return c.json({ error: 'Failed to update settings' }, 500);
  }
});

// Activity stats endpoints
app.get("/make-server-decdc163/stats", async (c) => {
  const user = await getAuthUser(c.req.header('Authorization') || null);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const stats = await kv.get(`user_stats:${user.id}`);
    return c.json({ stats });
  } catch (error) {
    console.error('Get stats error:', error);
    return c.json({ error: 'Failed to fetch stats' }, 500);
  }
});

app.put("/make-server-decdc163/stats", async (c) => {
  const user = await getAuthUser(c.req.header('Authorization') || null);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const updates = await c.req.json();
    const existing = await kv.get(`user_stats:${user.id}`);
    const stats = {
      ...existing,
      ...updates,
      updated_at: new Date().toISOString()
    };

    await kv.set(`user_stats:${user.id}`, stats);
    return c.json({ stats });
  } catch (error) {
    console.error('Update stats error:', error);
    return c.json({ error: 'Failed to update stats' }, 500);
  }
});

// Sync all data
app.post("/make-server-decdc163/sync", async (c) => {
  const user = await getAuthUser(c.req.header('Authorization') || null);
  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const { tools, settings, stats } = await c.req.json();

    // Sync tools
    if (tools && Array.isArray(tools)) {
      for (const tool of tools) {
        const toolId = `tool:${user.id}:${tool.id}`;
        await kv.set(toolId, {
          ...tool,
          user_id: user.id,
          updated_at: new Date().toISOString()
        });
      }
    }

    // Sync settings
    if (settings) {
      await kv.set(`user_settings:${user.id}`, {
        ...settings,
        user_id: user.id,
        updated_at: new Date().toISOString()
      });
    }

    // Sync stats
    if (stats) {
      await kv.set(`user_stats:${user.id}`, {
        ...stats,
        user_id: user.id,
        updated_at: new Date().toISOString()
      });
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Sync error:', error);
    return c.json({ error: 'Failed to sync data' }, 500);
  }
});

Deno.serve(app.fetch);