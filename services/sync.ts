import { projectId, publicAnonKey } from '../utils/supabase/info';
import { authService } from './auth';

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-decdc163`;

interface Tool {
  id: string;
  name: string;
  url: string;
  icon: string;
  color: string;
  category?: string;
  isFavorite?: boolean;
}

interface ActivityStats {
  totalClicks: number;
  clicksThisWeek: number;
  clicksLastWeek: number;
  lastResetDate: string;
}

class SyncService {
  private async getAuthHeader(): Promise<string | null> {
    const session = await authService.getSession();
    return session?.access_token ? `Bearer ${session.access_token}` : null;
  }

  async syncToCloud(tools: Tool[], themeIndex: number, stats: ActivityStats) {
    const authHeader = await this.getAuthHeader();
    if (!authHeader) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch(`${SERVER_URL}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify({
          tools,
          settings: { theme_index: themeIndex },
          stats: {
            total_clicks: stats.totalClicks,
            clicks_this_week: stats.clicksThisWeek,
            clicks_last_week: stats.clicksLastWeek,
            last_reset_date: stats.lastResetDate
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to sync to cloud');
      }

      return await response.json();
    } catch (error) {
      console.error('Sync to cloud error:', error);
      throw error;
    }
  }

  async getToolsFromCloud(): Promise<Tool[]> {
    const authHeader = await this.getAuthHeader();
    if (!authHeader) {
      return [];
    }

    try {
      const response = await fetch(`${SERVER_URL}/tools`, {
        headers: {
          'Authorization': authHeader
        }
      });

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data.tools || [];
    } catch (error) {
      console.error('Get tools from cloud error:', error);
      return [];
    }
  }

  async getSettingsFromCloud() {
    const authHeader = await this.getAuthHeader();
    if (!authHeader) {
      return null;
    }

    try {
      const response = await fetch(`${SERVER_URL}/settings`, {
        headers: {
          'Authorization': authHeader
        }
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.settings;
    } catch (error) {
      console.error('Get settings from cloud error:', error);
      return null;
    }
  }

  async getStatsFromCloud() {
    const authHeader = await this.getAuthHeader();
    if (!authHeader) {
      return null;
    }

    try {
      const response = await fetch(`${SERVER_URL}/stats`, {
        headers: {
          'Authorization': authHeader
        }
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.stats;
    } catch (error) {
      console.error('Get stats from cloud error:', error);
      return null;
    }
  }

  async saveToolToCloud(tool: Tool) {
    const authHeader = await this.getAuthHeader();
    if (!authHeader) {
      return;
    }

    try {
      await fetch(`${SERVER_URL}/tools`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify(tool)
      });
    } catch (error) {
      console.error('Save tool to cloud error:', error);
    }
  }

  async updateToolInCloud(toolId: string, updates: Partial<Tool>) {
    const authHeader = await this.getAuthHeader();
    if (!authHeader) {
      return;
    }

    try {
      await fetch(`${SERVER_URL}/tools/${toolId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify(updates)
      });
    } catch (error) {
      console.error('Update tool in cloud error:', error);
    }
  }

  async deleteToolFromCloud(toolId: string) {
    const authHeader = await this.getAuthHeader();
    if (!authHeader) {
      return;
    }

    try {
      await fetch(`${SERVER_URL}/tools/${toolId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': authHeader
        }
      });
    } catch (error) {
      console.error('Delete tool from cloud error:', error);
    }
  }

  async updateStatsInCloud(stats: ActivityStats) {
    const authHeader = await this.getAuthHeader();
    if (!authHeader) {
      return;
    }

    try {
      await fetch(`${SERVER_URL}/stats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify({
          total_clicks: stats.totalClicks,
          clicks_this_week: stats.clicksThisWeek,
          clicks_last_week: stats.clicksLastWeek,
          last_reset_date: stats.lastResetDate
        })
      });
    } catch (error) {
      console.error('Update stats in cloud error:', error);
    }
  }
}

export const syncService = new SyncService();
