function Container2() {
  return (
    <div className="bg-[rgba(168,85,247,0.13)] relative rounded-[13.202px] shrink-0 size-[52.806px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pb-[13.531px] pt-[10.891px] px-[9.406px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[29.703px] not-italic relative shrink-0 text-[#0a0a0a] text-[24.753px] whitespace-nowrap">🎨</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(168,85,247,0.19)] border-solid inset-0 pointer-events-none rounded-[13.202px] shadow-[0px_8.251px_12.376px_-2.475px_rgba(0,0,0,0.1),0px_3.3px_4.951px_-3.3px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[22.278px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.278px] left-[23.55px] not-italic text-[14.852px] text-center text-white top-[-0.99px] whitespace-nowrap">Figma</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[13.191px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.202px] not-italic relative shrink-0 text-[9.901px] text-[rgba(255,255,255,0.4)] text-center whitespace-nowrap">figma.com</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[38.769px] relative shrink-0 w-[45.947px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.3px] items-start relative size-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[13.202px] h-[104.777px] items-center relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function ToolCard() {
  return (
    <div className="bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col items-start p-[19.802px] relative rounded-[13.202px] shrink-0 size-[158.418px]" data-name="ToolCard">
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[13.202px]" />
      <Container1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[rgba(249,115,22,0.13)] relative rounded-[13.202px] shrink-0 size-[52.806px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pb-[13.531px] pt-[10.891px] px-[9.406px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[29.703px] not-italic relative shrink-0 text-[#0a0a0a] text-[24.753px] whitespace-nowrap">🎯</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(249,115,22,0.19)] border-solid inset-0 pointer-events-none rounded-[13.202px] shadow-[0px_8.251px_12.376px_-2.475px_rgba(0,0,0,0.1),0px_3.3px_4.951px_-3.3px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[22.278px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.278px] left-[28.52px] not-italic text-[14.852px] text-center text-white top-[-0.99px] whitespace-nowrap">Behance</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[13.191px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.202px] not-italic relative shrink-0 text-[9.901px] text-[rgba(255,255,255,0.4)] text-center whitespace-nowrap">behance.net</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[38.769px] relative shrink-0 w-[56.797px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.3px] items-start relative size-full">
        <Heading1 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col gap-[13.202px] h-[104.777px] items-center relative shrink-0 w-full" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function ToolCard1() {
  return (
    <div className="bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col items-start p-[19.802px] relative rounded-[13.202px] shrink-0 size-[158.418px]" data-name="ToolCard">
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[13.202px]" />
      <Container4 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[rgba(59,130,246,0.13)] relative rounded-[13.202px] shrink-0 size-[52.806px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pb-[13.531px] pt-[10.891px] px-[9.406px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[29.703px] not-italic relative shrink-0 text-[#0a0a0a] text-[24.753px] whitespace-nowrap">💻</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(59,130,246,0.19)] border-solid inset-0 pointer-events-none rounded-[13.202px] shadow-[0px_8.251px_12.376px_-2.475px_rgba(0,0,0,0.1),0px_3.3px_4.951px_-3.3px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[22.278px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.278px] left-[25.43px] not-italic text-[14.852px] text-center text-white top-[-0.99px] whitespace-nowrap">GitHub</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[13.191px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.202px] not-italic relative shrink-0 text-[9.901px] text-[rgba(255,255,255,0.4)] text-center whitespace-nowrap">github.com</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[38.769px] relative shrink-0 w-[49.66px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.3px] items-start relative size-full">
        <Heading2 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col gap-[13.202px] h-[104.777px] items-center relative shrink-0 w-full" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function ToolCard2() {
  return (
    <div className="bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col items-start p-[19.802px] relative rounded-[13.202px] shrink-0 size-[158.418px]" data-name="ToolCard">
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[13.202px]" />
      <Container7 />
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[rgba(236,72,153,0.13)] relative rounded-[13.202px] shrink-0 size-[52.806px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pb-[13.531px] pt-[10.891px] px-[9.406px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[29.703px] not-italic relative shrink-0 text-[#0a0a0a] text-[24.753px] whitespace-nowrap">📌</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(236,72,153,0.19)] border-solid inset-0 pointer-events-none rounded-[13.202px] shadow-[0px_8.251px_12.376px_-2.475px_rgba(0,0,0,0.1),0px_3.3px_4.951px_-3.3px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[22.278px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.278px] left-[29.6px] not-italic text-[14.852px] text-center text-white top-[-0.99px] whitespace-nowrap">Pinterest</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[13.191px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.202px] not-italic relative shrink-0 text-[9.901px] text-[rgba(255,255,255,0.4)] text-center whitespace-nowrap">pinterest.com</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[38.769px] relative shrink-0 w-[59.582px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.3px] items-start relative size-full">
        <Heading3 />
        <Paragraph3 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col gap-[13.202px] h-[104.777px] items-center relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container12 />
    </div>
  );
}

function ToolCard3() {
  return (
    <div className="bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col items-start p-[19.802px] relative rounded-[13.202px] shrink-0 size-[158.418px]" data-name="ToolCard">
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[13.202px]" />
      <Container10 />
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-[rgba(34,197,94,0.13)] relative rounded-[13.202px] shrink-0 size-[52.806px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pb-[13.531px] pt-[10.891px] px-[9.406px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[29.703px] not-italic relative shrink-0 text-[#0a0a0a] text-[24.753px] whitespace-nowrap">🤖</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(34,197,94,0.19)] border-solid inset-0 pointer-events-none rounded-[13.202px] shadow-[0px_8.251px_12.376px_-2.475px_rgba(0,0,0,0.1),0px_3.3px_4.951px_-3.3px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[22.278px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.278px] left-[35.89px] not-italic text-[14.852px] text-center text-white top-[-0.99px] whitespace-nowrap">ChatGPT</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex h-[13.191px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.202px] not-italic relative shrink-0 text-[9.901px] text-[rgba(255,255,255,0.4)] text-center whitespace-nowrap">chat.openai.com</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[38.769px] relative shrink-0 w-[71.608px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.3px] items-start relative size-full">
        <Heading4 />
        <Paragraph4 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[13.202px] h-[104.777px] items-center relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function ToolCard4() {
  return (
    <div className="bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col items-start p-[19.802px] relative rounded-[13.202px] shrink-0 size-[158.418px]" data-name="ToolCard">
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[13.202px]" />
      <Container13 />
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-[rgba(239,68,68,0.13)] relative rounded-[13.202px] shrink-0 size-[52.806px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pb-[13.531px] pt-[10.891px] px-[9.406px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[29.703px] not-italic relative shrink-0 text-[#0a0a0a] text-[24.753px] whitespace-nowrap">🎬</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(239,68,68,0.19)] border-solid inset-0 pointer-events-none rounded-[13.202px] shadow-[0px_8.251px_12.376px_-2.475px_rgba(0,0,0,0.1),0px_3.3px_4.951px_-3.3px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[22.278px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.278px] left-[29.35px] not-italic text-[14.852px] text-center text-white top-[-0.99px] whitespace-nowrap">YouTube</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[13.191px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.202px] not-italic relative shrink-0 text-[9.901px] text-[rgba(255,255,255,0.4)] text-center whitespace-nowrap">youtube.com</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[38.769px] relative shrink-0 w-[57.323px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.3px] items-start relative size-full">
        <Heading5 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col gap-[13.202px] h-[104.777px] items-center relative shrink-0 w-full" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function ToolCard5() {
  return (
    <div className="bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col items-start p-[19.802px] relative rounded-[13.202px] shrink-0 size-[158.418px]" data-name="ToolCard">
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[13.202px]" />
      <Container16 />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-[rgba(236,72,153,0.13)] relative rounded-[13.202px] shrink-0 size-[52.806px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pb-[13.531px] pt-[10.891px] px-[9.406px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[29.703px] not-italic relative shrink-0 text-[#0a0a0a] text-[24.753px] whitespace-nowrap">📝</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(236,72,153,0.19)] border-solid inset-0 pointer-events-none rounded-[13.202px] shadow-[0px_8.251px_12.376px_-2.475px_rgba(0,0,0,0.1),0px_3.3px_4.951px_-3.3px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[22.278px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.278px] left-[24px] not-italic text-[14.852px] text-center text-white top-[-0.99px] whitespace-nowrap">Notion</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[13.191px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[13.202px] min-w-px not-italic relative text-[9.901px] text-[rgba(255,255,255,0.4)] text-center">notion.so</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[38.769px] relative shrink-0 w-[47.051px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.3px] items-start relative size-full">
        <Heading6 />
        <Paragraph6 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[13.202px] h-[104.777px] items-center relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function ToolCard6() {
  return (
    <div className="bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col items-start p-[19.802px] relative rounded-[13.202px] shrink-0 size-[158.418px]" data-name="ToolCard">
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[13.202px]" />
      <Container19 />
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-[rgba(6,182,212,0.13)] relative rounded-[13.202px] shrink-0 size-[52.806px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip pb-[13.531px] pt-[10.891px] px-[9.406px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[29.703px] not-italic relative shrink-0 text-[#0a0a0a] text-[24.753px] whitespace-nowrap">✨</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(6,182,212,0.19)] border-solid inset-0 pointer-events-none rounded-[13.202px] shadow-[0px_8.251px_12.376px_-2.475px_rgba(0,0,0,0.1),0px_3.3px_4.951px_-3.3px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[22.278px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.278px] left-[25.93px] not-italic text-[14.852px] text-center text-white top-[-0.99px] whitespace-nowrap">Framer</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex h-[13.191px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[13.202px] not-italic relative shrink-0 text-[9.901px] text-[rgba(255,255,255,0.4)] text-center whitespace-nowrap">framer.com</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[38.769px] relative shrink-0 w-[49.784px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[3.3px] items-start relative size-full">
        <Heading7 />
        <Paragraph7 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[13.202px] h-[104.777px] items-center relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container24 />
    </div>
  );
}

function ToolCard7() {
  return (
    <div className="bg-[rgba(0,0,0,0.4)] content-stretch flex flex-col items-start p-[19.802px] relative rounded-[13.202px] shrink-0 size-[158.418px]" data-name="ToolCard">
      <div aria-hidden="true" className="absolute border-[0.66px] border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[13.202px]" />
      <Container22 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-start flex flex-wrap gap-[10px] items-start justify-center p-[10px] relative size-full" data-name="Container">
      <ToolCard />
      <ToolCard1 />
      <ToolCard2 />
      <ToolCard3 />
      <ToolCard4 />
      <ToolCard5 />
      <ToolCard6 />
      <ToolCard7 />
    </div>
  );
}