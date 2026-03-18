import { useState, createContext, useContext } from "react";

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────
const TRL_COLORS={1:"#EF4444",2:"#F97316",3:"#F59E0B",4:"#EAB308",5:"#84CC16",6:"#22C55E",7:"#10B981",8:"#06B6D4",9:"#3B82F6"};
const TRL_LABELS={1:"Basic Principles",2:"Technology Concept",3:"Experimental Proof",4:"Lab Validation",5:"Relevant Environment",6:"Prototype Demo",7:"System Prototype",8:"System Complete",9:"Actual System"};
const CAT_COLORS={AgriTech:"#16A34A",FinTech:"#2563EB",CleanTech:"#0891B2",HealthTech:"#DB2777",Logistics:"#EA580C",EnergyTech:"#CA8A04",Manufacturing:"#7C3AED",GovTech:"#475569",EdTech:"#9333EA",BioTech:"#059669"};
const ROLE_CFG={admin:{color:"#7C3AED",bg:"#F5F0FF",label:"Admin",icon:"⚙"},innovator:{color:"#2563EB",bg:"#EFF6FF",label:"Innovator",icon:"🔬"},seeker:{color:"#D97706",bg:"#FFFBEB",label:"Seeker",icon:"🏢"},investor:{color:"#059669",bg:"#F0FDF4",label:"Investor",icon:"💼"}};
const STATUS_CFG={draft:{label:"Draft",color:"#94A3B8"},pending:{label:"Pending Review",color:"#F59E0B"},published:{label:"Published",color:"#10B981"},rejected:{label:"Rejected",color:"#EF4444"},active:{label:"Active Project",color:"#2563EB"}};
const PERM_COLOR={owner:"#7C3AED",editor:"#2563EB",contributor:"#10B981",viewer:"#94A3B8"};
const NEWS_TYPE_COLORS={update:"#2563EB",research:"#7C3AED",funding:"#10B981",milestone:"#D97706",announcement:"#0891B2",general:"#94A3B8"};
const FIELDS_LIST=["AgriTech","FinTech","CleanTech","HealthTech","Logistics","EnergyTech","Manufacturing","GovTech","EdTech","BioTech"];
const ARGONAUTS_STATUS={open:{label:"Open",color:"#10B981",icon:"🟢"},forming:{label:"Team Forming",color:"#F59E0B",icon:"🟡"},launched:{label:"Project Launched",color:"#2563EB",icon:"🚀"},closed:{label:"Closed",color:"#94A3B8",icon:"⚫"}};
const DISCIPLINES_LIST=["AI & Machine Learning","Materials Science","Robotics & Automation","Biomedical Engineering","Environmental Science","Software Engineering","Data Science","Mechanical Engineering","Chemical Engineering","Electrical Engineering","Social Sciences","Business & Commercialization"];
const NOTIF_ICONS={approval:"✅",solution:"📥",investment:"💰",nda:"📋",match:"🎯",project:"🤝",recruit:"👋",update:"📢",news:"📰",koko:"⭐",argonauts:"⚔",invite:"📨",accepted:"🎉",candidate:"👤",formed:"🚀"};

// ─── KOKO CONTEXT ────────────────────────────────────────────────────────────
const KokoContext = createContext(null);
const useKoko = () => useContext(KokoContext);

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const USERS=[
  {id:"u1",name:"Dr. Nguyen Thi Lan",role:"innovator",dept:"FIT Lab – UIT",color:"#2563EB",tags:["Computer Vision","IoT","ML","AgriTech"]},
  {id:"u2",name:"Viet Nam Steel Corp",role:"seeker",dept:"R&D Division",color:"#D97706",tags:["Manufacturing","Sensors"]},
  {id:"u3",name:"Do Ventures",role:"investor",dept:"Investment Team",color:"#059669",tags:["DeepTech","HealthTech"]},
  {id:"u4",name:"Admin – VIX Platform",role:"admin",dept:"Platform Operations",color:"#7C3AED",tags:[]},
  {id:"u5",name:"Prof. Le Van Duc",role:"innovator",dept:"HCMUS",color:"#0891B2",tags:["IoT","Embedded"]},
  {id:"u6",name:"DHG Pharmaceutical",role:"seeker",dept:"Innovation Lab",color:"#DB2777",tags:["HealthTech"]},
];

const IP_DATA=[
  {id:"i1",title:"AI-Powered Crop Disease Detection",field:"AgriTech",trl:5,innovator:"Dr. Nguyen Thi Lan",innovatorId:"u1",desc:"Deep learning model detecting 40+ rice diseases with 96% accuracy via smartphone imaging.",overview:"EfficientNet-B4 backbone fine-tuned on 45,000 field images. Offline-capable, validated across 12 provinces.",tags:["Computer Vision","IoT","ML","AgriTech"],assetType:"Patent Pending",legalRef:"VN-2024-12345",status:"published",fundingTarget:150000,fundingRaised:45000,stage:"Prototype",views:1240,interests:3,authors:[{name:"Dr. Nguyen Thi Lan",role:"Principal Investigator",org:"FIT Lab – UIT",userId:"u1"}],timeline:[{id:"ms1",title:"Concept & Literature Review",stage:"Research",done:true,pct:100,date:"2023-03",endDate:"2023-06",desc:"Comprehensive review of 200+ papers.",docs:[],updates:[]},{id:"ms2",title:"Dataset Collection",stage:"Research",done:true,pct:100,date:"2023-06",endDate:"2023-11",desc:"45,000 field images collected.",docs:[],updates:[]},{id:"ms3",title:"Lab Prototype",stage:"Prototype",done:true,pct:100,date:"2024-01",endDate:"2024-04",desc:"EfficientNet-B4 achieving 96% accuracy.",docs:[],updates:[]},{id:"ms4",title:"Commercial Pilot",stage:"Pilot",done:false,pct:45,date:"2025-03",endDate:"2025-07",desc:"Pilot with 3 cooperatives.",docs:[],updates:[],current:true}],docs:[{name:"Technical Specification v2.1",confidential:false,size:"2.4 MB",type:"pdf",date:"2025-01-15"},{name:"Patent Draft VN-2024-12345",confidential:true,size:"3.8 MB",type:"pdf",date:"2024-11-30"}]},
  {id:"i2",title:"Blockchain Supply Chain Traceability",field:"FinTech",trl:6,innovator:"Prof. Le Van Duc",innovatorId:"u5",desc:"Immutable ledger tracking goods from farm to shelf across 200+ supply chain nodes.",overview:"Hyperledger Fabric-based permissioned blockchain, 2,000 TPS.",tags:["Blockchain","Web3","Logistics","FinTech"],assetType:"Copyright",legalRef:"VN-SW-2024-0892",status:"published",fundingTarget:300000,fundingRaised:120000,stage:"MVP",views:890,interests:5,authors:[{name:"Prof. Le Van Duc",role:"Principal Investigator",org:"HCMUS",userId:"u5"}],timeline:[{id:"ms1",title:"Protocol Design",stage:"Research",done:true,pct:100,date:"2023-01",endDate:"2023-04",desc:"Architecture defined.",docs:[],updates:[]},{id:"ms2",title:"Scale-up",stage:"Commercialization",done:false,pct:70,date:"2025-02",endDate:"2025-06",desc:"Full deployment.",docs:[],updates:[],current:true}],docs:[{name:"Architecture Whitepaper",confidential:false,size:"4.1 MB",type:"pdf",date:"2024-09-01"}]},
  {id:"i3",title:"Smart Water Quality Monitor",field:"CleanTech",trl:4,innovator:"Dr. Hoang Minh Tuan",innovatorId:"u1",desc:"Real-time multi-parameter water sensor with edge AI for early contamination alerts.",overview:"Custom PCB with ESP32-S3. 9 water quality params.",tags:["IoT","Sensors","Environmental"],assetType:"Patent Filed",legalRef:"PCT/VN2024/000234",status:"published",fundingTarget:80000,fundingRaised:20000,stage:"Lab Proven",views:670,interests:2,authors:[{name:"Dr. Hoang Minh Tuan",role:"Lead Researcher",org:"UIT",userId:"u1"}],timeline:[{id:"ms1",title:"PCB Prototype",stage:"Prototype",done:true,pct:100,date:"2023-11",endDate:"2024-02",desc:"PCB v1.0 assembled.",docs:[],updates:[]},{id:"ms2",title:"Field Deployment",stage:"Testing",done:false,pct:20,date:"2024-10",endDate:"2025-02",desc:"10 units deployed.",docs:[],updates:[],current:true}],docs:[{name:"Hardware Spec Sheet",confidential:false,size:"1.2 MB",type:"pdf",date:"2024-06-15"}]},
];

const PROJECTS=[
  {id:"p1",ipId:"i1",title:"AI Crop × Steel Corp Joint R&D",ownerId:"u2",ownerName:"Viet Nam Steel Corp",stage:"Prototype Development",fundingAmount:120000,fundingTarget:300000,status:"active",progress:45,desc:"Joint R&D adapting crop disease detection AI for predictive industrial maintenance.",members:[{userId:"u2",name:"Viet Nam Steel Corp",role:"owner",permission:"owner",color:"#D97706",joinedDate:"2025-01-05"},{userId:"u1",name:"Dr. Nguyen Thi Lan",role:"innovator",permission:"editor",color:"#2563EB",joinedDate:"2025-01-05"},{userId:"u3",name:"Do Ventures",role:"investor",permission:"viewer",color:"#059669",joinedDate:"2025-01-10"}],chronicle:[{id:"c1",author:"Viet Nam Steel Corp",authorColor:"#D97706",date:"2025-02-08",type:"milestone",title:"Prototype v0.2 Delivered – 87% Accuracy",body:"Edge AI model achieves 87% detection accuracy on vibration data from CNC Line 4.",attachments:["Prototype_v0.2_Report.pdf"],tags:["Prototype","Milestone"]}],docs:["NDA Agreement.pdf"],recruitment:[]},
  {id:"p2",ipId:"i2",title:"Blockchain Pharma Traceability",ownerId:"u6",ownerName:"DHG Pharmaceutical",stage:"Pilot Testing",fundingAmount:210000,fundingTarget:400000,status:"active",progress:70,desc:"Pilot of blockchain-based anti-counterfeit authentication in DHG's packaging line.",members:[{userId:"u6",name:"DHG Pharmaceutical",role:"owner",permission:"owner",color:"#DB2777",joinedDate:"2024-10-01"},{userId:"u5",name:"Prof. Le Van Duc",role:"innovator",permission:"editor",color:"#0891B2",joinedDate:"2024-10-01"}],chronicle:[{id:"c1",author:"DHG Pharmaceutical",authorColor:"#DB2777",date:"2025-02-09",type:"update",title:"Pilot Week 3 – 99.8% Authentication Rate",body:"42,000 units processed, authentication rate 99.8%.",attachments:[],tags:[]}],docs:["Pilot Test Protocol.pdf"],recruitment:[]},
];

const CHALLENGES=[
  {id:"c1",title:"Predictive Maintenance for CNC Machines",org:"Viet Nam Steel Corp",seekerId:"u2",industry:"Manufacturing",reward:"$15,000",deadline:"2025-03-31",status:"open",proposals:8,urgent:true,desc:"CNC machining line experiences 4–6 unplanned shutdowns/month. Need ML solution predicting failure 48+ hours ahead.",tags:["Sensors","ML","Manufacturing"]},
  {id:"c2",title:"Flood Early Warning System – Mekong Delta",org:"Ministry of Natural Resources",seekerId:"u2",industry:"GovTech",reward:"$25,000",deadline:"2025-04-15",status:"open",proposals:12,urgent:false,desc:"72-hour flood prediction with 85% accuracy combining satellite imagery, IoT water gauges, and weather APIs.",tags:["IoT","Climate","GovTech"]},
];

const ARGONAUTS_DATA_INIT=[
  {
    id:"arg1",title:"Net-Zero Smart City Infrastructure for Can Tho",org:"Ministry of Construction",orgId:"u2",field:"CleanTech",
    status:"forming",fundingCommitment:"$2,500,000",teamSize:12,applicantsCount:28,
    disciplines:["AI & Machine Learning","Environmental Science","Electrical Engineering","Software Engineering","Social Sciences","Business & Commercialization"],
    desc:"Design and deploy an integrated net-zero smart city pilot for Can Tho, addressing energy, mobility, water, and governance as an interconnected system.",
    expectedImpact:"Reduce urban carbon emissions by 40% in pilot zones, create a replicable model for 10 additional Vietnamese cities by 2030.",
    deliverables:["Smart energy grid design & pilot","Low-carbon mobility system","Real-time city IoT dashboard","Policy & replication playbook"],
    tags:["CleanTech","Smart City","Net Zero","GovTech","IoT"],
    chronicle:[{id:"ch1",author:"Ministry of Construction",authorColor:"#475569",date:"2025-01-15",type:"announcement",title:"Argonauts Mission Launched",body:"We are proud to announce the launch of the Net-Zero Smart City Argonauts mission. Applications are now open.",attachments:[],tags:[]}],
    candidates:[
      {id:"cand1",name:"Dr. Nguyen Thi Lan",userId:"u1",discipline:"AI & Machine Learning",type:"applicant",status:"approved",motivation:"My crop AI and IoT expertise directly applies to smart city sensing.",expertise:"Computer Vision, IoT, ML",date:"2025-01-20"},
      {id:"cand2",name:"Prof. Le Van Duc",userId:"u5",discipline:"Software Engineering",type:"invited",status:"pending",motivation:"Invited expert in IoT infrastructure.",expertise:"IoT, Embedded, Blockchain",date:"2025-01-22"},
      {id:"cand3",name:"Dr. Pham Van An",userId:null,discipline:"Environmental Science",type:"applicant",status:"pending",motivation:"10+ years urban environmental monitoring.",expertise:"Air quality, Climate modeling",date:"2025-01-25"},
      {id:"cand4",name:"Assoc. Prof. Tran Minh Duc",userId:null,discipline:"Electrical Engineering",type:"applicant",status:"approved",motivation:"Smart grid design and micro-grid optimization.",expertise:"Power systems, Smart grid",date:"2025-01-28"},
    ],
    suggestedExperts:[
      {id:"u5",name:"Prof. Le Van Duc",dept:"HCMUS",expertise:"IoT & Embedded Systems",tags:["IoT","Embedded","Manufacturing"],matchReason:"IoT infrastructure & systems integration",color:"#0891B2"},
      {id:"ex1",name:"Dr. Hoang Thi Mai",dept:"HCMUT Energy Lab",expertise:"Smart Grid & Renewable Energy",tags:["EnergyTech","Grid","Solar"],matchReason:"Smart energy grid design expertise",color:"#CA8A04"},
      {id:"ex2",name:"Prof. Nguyen Van Long",dept:"USSH",expertise:"Urban Planning & Social Policy",tags:["GovTech","Urban","Policy"],matchReason:"City governance & replication strategy",color:"#475569"},
    ],
    linkedProjectId:null,createdBy:"u2",
  },
  {
    id:"arg2",title:"Next-Gen Malaria Diagnostics for Rural Vietnam",org:"Ministry of Health",orgId:"u6",field:"HealthTech",
    status:"open",fundingCommitment:"$1,200,000",teamSize:8,applicantsCount:14,
    disciplines:["AI & Machine Learning","Biomedical Engineering","Chemical Engineering","Social Sciences"],
    desc:"Develop a low-cost, AI-powered point-of-care malaria diagnostic tool deployable in rural health clinics without lab infrastructure.",
    expectedImpact:"Reduce malaria diagnostic time from 4 hours to under 10 minutes. Target 500 rural clinics by 2027.",
    deliverables:["AI diagnostic algorithm (>97% accuracy)","Portable hardware prototype","Clinical validation study","Deployment & training manual"],
    tags:["HealthTech","AI","Diagnostics","Rural","BioTech"],
    chronicle:[{id:"ch1",author:"Ministry of Health",authorColor:"#DB2777",date:"2025-02-01",type:"announcement",title:"Mission Posted — Applications Open",body:"We seek multidisciplinary innovators to tackle rural malaria diagnostics.",attachments:[],tags:[]}],
    candidates:[{id:"cand1",name:"Prof. Tran Thi Mai",userId:null,discipline:"Biomedical Engineering",type:"applicant",status:"pending",motivation:"10 years biomedical device development.",expertise:"Medical devices, Biosensors",date:"2025-02-05"}],
    suggestedExperts:[
      {id:"u1",name:"Dr. Nguyen Thi Lan",dept:"FIT Lab – UIT",expertise:"AI & Computer Vision",tags:["ML","Computer Vision","HealthTech"],matchReason:"AI diagnostic algorithm development",color:"#2563EB"},
    ],
    linkedProjectId:null,createdBy:"u6",
  },
  {
    id:"arg3",title:"Circular Economy Platform for Vietnamese Manufacturing",org:"Ministry of Industry & Trade",orgId:"u2",field:"Manufacturing",
    status:"open",fundingCommitment:"$800,000",teamSize:10,applicantsCount:7,
    disciplines:["AI & Machine Learning","Materials Science","Business & Commercialization","Robotics & Automation","Data Science"],
    desc:"Design an AI-driven circular economy marketplace and reverse logistics system for Vietnamese manufacturers to exchange material waste.",
    expectedImpact:"Divert 500,000 tonnes of industrial waste annually. Create $120M secondary materials market by 2028.",
    deliverables:["Waste exchange digital platform","AI material matching engine","Regulatory framework proposal","Pilot with 50 factories"],
    tags:["Manufacturing","CircularEconomy","AI","Logistics","Sustainability"],
    chronicle:[],
    candidates:[],
    suggestedExperts:[{id:"u1",name:"Dr. Nguyen Thi Lan",dept:"FIT Lab – UIT",expertise:"AI & Machine Learning",tags:["ML","AI"],matchReason:"AI matching engine design",color:"#2563EB"}],
    linkedProjectId:null,createdBy:"u2",
  },
];

// ═══════════════════════════════════════════════
//  SHARED UI PRIMITIVES
// ═══════════════════════════════════════════════
const Badge = ({ text, color="#2563EB", sm }) => (
  <span style={{fontSize:sm?8.5:10,fontWeight:700,padding:sm?"2px 7px":"3px 10px",borderRadius:20,background:`${color}18`,color,border:`1px solid ${color}2E`,textTransform:"uppercase",letterSpacing:"0.05em",display:"inline-block",whiteSpace:"nowrap",fontFamily:"'DM Sans',sans-serif"}}>{text}</span>
);
const TRLBadge = ({ level, showLabel }) => (
  <span style={{fontSize:10,fontWeight:800,padding:"3px 10px",borderRadius:20,background:TRL_COLORS[level]||"#94A3B8",color:"#fff",display:"inline-flex",alignItems:"center",gap:4}}>
    <span>TRL {level}</span>{showLabel && <span style={{fontWeight:500,opacity:.85}}>· {TRL_LABELS[level]}</span>}
  </span>
);
const StatusBadge = ({ status }) => {
  const c = STATUS_CFG[status] || { label:status, color:"#94A3B8" };
  return <Badge text={c.label} color={c.color} />;
};
const Avatar = ({ name="?", size=34, color="#2563EB" }) => (
  <div style={{width:size,height:size,borderRadius:"50%",background:`linear-gradient(135deg,${color},${color}88)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.38,fontWeight:900,color:"#fff",flexShrink:0,fontFamily:"'DM Sans',sans-serif"}}>{(name||"?")[0].toUpperCase()}</div>
);
const AvatarStack = ({ members=[], max=4 }) => (
  <div style={{display:"flex"}}>
    {members.slice(0,max).map((m,i) => (
      <div key={i} title={m.name} style={{marginLeft:i===0?0:-9,border:"2.5px solid #fff",borderRadius:"50%",zIndex:max-i}}>
        <Avatar name={m.name} size={28} color={m.color||"#2563EB"} />
      </div>
    ))}
    {members.length>max && <div style={{marginLeft:-9,width:28,height:28,borderRadius:"50%",background:"#E2E8F0",border:"2.5px solid #fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:"#64748B"}}>+{members.length-max}</div>}
  </div>
);
const Btn = ({ children, onClick, variant="primary", color, size="md", icon, full, disabled, style:s={} }) => {
  const [hov, setHov] = useState(false);
  const c = color || "#2563EB";
  const sz = {sm:{padding:"6px 14px",fontSize:11},md:{padding:"9px 20px",fontSize:13},lg:{padding:"13px 28px",fontSize:14}};
  const base = {borderRadius:10,fontWeight:700,cursor:disabled?"not-allowed":"pointer",border:"2px solid transparent",display:"inline-flex",alignItems:"center",gap:6,transition:"all 0.18s",fontFamily:"'DM Sans',sans-serif",width:full?"100%":"auto",justifyContent:full?"center":"flex-start",opacity:disabled?.5:1,...sz[size]};
  const V = {
    primary:{background:hov?`${c}CC`:c,color:"#fff",border:`2px solid ${c}`,boxShadow:hov?`0 6px 18px ${c}44`:"none"},
    outline:{background:hov?`${c}10`:"transparent",color:c,border:`2px solid ${c}`},
    ghost:{background:hov?"#F1F5F9":"transparent",color:"#64748B",border:"2px solid transparent"},
    danger:{background:hov?"#DC2626":"#EF4444",color:"#fff",border:"2px solid #EF4444"},
    success:{background:hov?"#059669":"#10B981",color:"#fff",border:"2px solid #10B981"},
    soft:{background:hov?`${c}22`:`${c}12`,color:c,border:`2px solid ${c}22`},
  };
  return (
    <button onClick={disabled?undefined:onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{...base,...V[variant],...s}}>
      {icon && <span style={{fontSize:14}}>{icon}</span>}{children}
    </button>
  );
};
const Card = ({ children, style={}, onClick, hover=true, accent }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={()=>hover&&setHov(true)} onMouseLeave={()=>hover&&setHov(false)}
      style={{background:"#fff",borderRadius:16,border:`1px solid ${hov&&hover?"#BFDBFE":"#E8EDFB"}`,boxShadow:hov&&hover?"0 10px 36px rgba(37,99,235,0.12)":"0 1px 4px rgba(0,0,0,0.04)",transition:"all 0.2s",transform:hov&&hover?"translateY(-2px)":"none",cursor:onClick?"pointer":"default",...(accent?{borderLeft:`4px solid ${accent}`}:{}),...style}}>
      {children}
    </div>
  );
};
const StatCard = ({ label, value, icon, color="#2563EB", onClick }) => (
  <Card style={{padding:20}} hover={!!onClick} onClick={onClick}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
      <div>
        <div style={{fontSize:10,color:"#94A3B8",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:5,fontFamily:"'DM Sans',sans-serif"}}>{label}</div>
        <div style={{fontSize:28,fontWeight:900,color:"#1E293B",fontFamily:"'Syne',sans-serif",lineHeight:1}}>{value}</div>
      </div>
      <div style={{width:40,height:40,borderRadius:12,background:`${color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{icon}</div>
    </div>
  </Card>
);
const ProgressBar = ({ value, color="#2563EB", h=7 }) => (
  <div style={{background:"#F1F5F9",borderRadius:h,height:h,overflow:"hidden"}}>
    <div style={{width:`${Math.min(100,Math.max(0,value))}%`,height:"100%",background:color,borderRadius:h,transition:"width 0.5s ease"}} />
  </div>
);
const Tag = ({ text, color }) => (
  <span style={{fontSize:10,fontWeight:600,padding:"3px 9px",borderRadius:6,background:color?`${color}14`:"#F1F5F9",color:color||"#64748B",border:`1px solid ${color?color+"25":"#E2E8F0"}`,fontFamily:"'DM Sans',sans-serif"}}>{text}</span>
);
const TRLMeter = ({ level }) => (
  <div style={{display:"flex",gap:3,alignItems:"center"}}>
    {[...Array(9)].map((_,i) => <div key={i} style={{width:14,height:5,borderRadius:2,background:i<level?TRL_COLORS[level]:"#E2E8F0"}} />)}
    <span style={{fontSize:10,color:"#94A3B8",marginLeft:5,fontFamily:"'DM Sans',sans-serif"}}>TRL {level}/9</span>
  </div>
);
const PageHeader = ({ title, sub, action, actionLabel, actionColor="#2563EB", actionIcon, badge }) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:26}}>
    <div style={{display:"flex",gap:12,alignItems:"center"}}>
      <div>
        <h1 style={{fontSize:24,fontWeight:900,color:"#1E293B",margin:"0 0 4px",fontFamily:"'Syne',sans-serif"}}>{title}</h1>
        {sub && <p style={{fontSize:13,color:"#94A3B8",margin:0,fontFamily:"'DM Sans',sans-serif"}}>{sub}</p>}
      </div>
      {badge && <div style={{background:"linear-gradient(135deg,#7C3AED,#2563EB)",borderRadius:10,padding:"4px 12px",fontSize:10,fontWeight:800,color:"#fff",fontFamily:"'Syne',sans-serif",letterSpacing:"0.08em"}}>{badge}</div>}
    </div>
    {action && <Btn onClick={action} color={actionColor} size="md" icon={actionIcon}>{actionLabel}</Btn>}
  </div>
);
const SectionTitle = ({ title, sub, action, actionLabel, actionColor="#2563EB" }) => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}>
    <div>
      <h2 style={{fontSize:16,fontWeight:800,color:"#1E293B",margin:0,fontFamily:"'Syne',sans-serif"}}>{title}</h2>
      {sub && <p style={{fontSize:11,color:"#94A3B8",margin:"2px 0 0",fontFamily:"'DM Sans',sans-serif"}}>{sub}</p>}
    </div>
    {action && <Btn onClick={action} color={actionColor} size="sm">{actionLabel}</Btn>}
  </div>
);
const BackBtn = ({ onClick, label="← Back" }) => (
  <button onClick={onClick}
    style={{background:"none",border:"1.5px solid #E2E8F0",color:"#64748B",padding:"7px 16px",borderRadius:9,cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif",marginBottom:20,display:"inline-flex",alignItems:"center",gap:5}}
    onMouseEnter={e=>{e.currentTarget.style.borderColor="#93C5FD";e.currentTarget.style.color="#2563EB";}}
    onMouseLeave={e=>{e.currentTarget.style.borderColor="#E2E8F0";e.currentTarget.style.color="#64748B";}}>
    {label}
  </button>
);
const Modal = ({ open, onClose, title, children, wide }) => {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(15,23,42,0.6)",backdropFilter:"blur(5px)",zIndex:999,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,width:"100%",maxWidth:wide?680:520,maxHeight:"92vh",overflow:"auto",boxShadow:"0 30px 80px rgba(0,0,0,0.25)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"18px 26px",borderBottom:"1px solid #F1F5F9",position:"sticky",top:0,background:"#fff",zIndex:2}}>
          <h3 style={{fontSize:16,fontWeight:800,color:"#1E293B",margin:0,fontFamily:"'Syne',sans-serif"}}>{title}</h3>
          <button onClick={onClose} style={{background:"#F1F5F9",border:"none",borderRadius:8,width:30,height:30,cursor:"pointer",fontSize:15,color:"#64748B"}}>✕</button>
        </div>
        <div style={{padding:26}}>{children}</div>
      </div>
    </div>
  );
};
const Input = ({ label, value, onChange, placeholder, type="text", required, rows }) => (
  <div style={{marginBottom:15}}>
    {label && <label style={{display:"block",fontSize:11,fontWeight:700,color:"#374151",marginBottom:5,fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",letterSpacing:"0.04em"}}>{label}{required && <span style={{color:"#EF4444"}}> *</span>}</label>}
    {rows
      ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{width:"100%",padding:"10px 13px",border:"1.5px solid #E2E8F0",borderRadius:10,fontSize:13,fontFamily:"'DM Sans',sans-serif",resize:"vertical",outline:"none",boxSizing:"border-box"}} />
      : <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{width:"100%",padding:"10px 13px",border:"1.5px solid #E2E8F0",borderRadius:10,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box"}} />
    }
  </div>
);
const Sel = ({ label, value, onChange, options, required }) => (
  <div style={{marginBottom:15}}>
    {label && <label style={{display:"block",fontSize:11,fontWeight:700,color:"#374151",marginBottom:5,fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",letterSpacing:"0.04em"}}>{label}{required && <span style={{color:"#EF4444"}}> *</span>}</label>}
    <select value={value} onChange={e=>onChange(e.target.value)} style={{width:"100%",padding:"10px 13px",border:"1.5px solid #E2E8F0",borderRadius:10,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none",boxSizing:"border-box",background:"#fff"}}>
      <option value="">Select…</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);
const Tabs = ({ tabs, active, onChange }) => (
  <div style={{display:"flex",gap:2,background:"#F8FAFC",borderRadius:12,padding:4,flexWrap:"wrap",border:"1px solid #E8EDFB"}}>
    {tabs.map(t => (
      <button key={t.id} onClick={()=>onChange(t.id)}
        style={{padding:"7px 16px",borderRadius:9,border:"none",background:active===t.id?"#fff":"transparent",color:active===t.id?"#1E293B":"#94A3B8",fontWeight:active===t.id?700:500,fontSize:12,cursor:"pointer",fontFamily:"'DM Sans',sans-serif",boxShadow:active===t.id?"0 1px 6px rgba(0,0,0,0.09)":"none",transition:"all 0.15s",display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}>
        {t.icon && <span style={{fontSize:13}}>{t.icon}</span>}
        {t.label}
        {t.count !== undefined && <span style={{fontSize:9,background:active===t.id?"#EFF6FF":"#E2E8F0",color:active===t.id?"#2563EB":"#94A3B8",borderRadius:8,padding:"1px 6px",fontWeight:700}}>{t.count}</span>}
        {t.badge && <span style={{fontSize:8,background:"#2563EB",color:"#fff",borderRadius:6,padding:"2px 5px",fontWeight:700}}>{t.badge}</span>}
      </button>
    ))}
  </div>
);

// ─── KOKO BUTTON ──────────────────────────────────────────────────────────────
const KokoBtn = ({ type, item, size="md" }) => {
  const { isKoko, toggleKoko } = useKoko();
  const saved = isKoko(type, item.id);
  const [pop, setPop] = useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    toggleKoko(type, item);
    setPop(true);
    setTimeout(() => setPop(false), 600);
  };
  const sz = size === "sm" ? 28 : 34;
  const iconSz = size === "sm" ? 13 : 15;
  return (
    <div style={{position:"relative",display:"inline-flex",flexShrink:0}} title={saved?"Remove from Koko":"Add to Koko"}>
      <button onClick={handleClick}
        style={{width:sz,height:sz,borderRadius:8,background:saved?"#FEF3C7":"#F8FAFC",border:`1.5px solid ${saved?"#F59E0B":"#E2E8F0"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.18s",transform:pop?"scale(1.28)":"scale(1)",flexShrink:0}}
        onMouseEnter={e=>{e.currentTarget.style.borderColor=saved?"#D97706":"#93C5FD";e.currentTarget.style.background=saved?"#FDE68A":"#EFF6FF";}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor=saved?"#F59E0B":"#E2E8F0";e.currentTarget.style.background=saved?"#FEF3C7":"#F8FAFC";}}>
        <span style={{fontSize:iconSz,lineHeight:1}}>{saved?"⭐":"☆"}</span>
      </button>
      {pop && (
        <div style={{position:"absolute",bottom:"calc(100% + 6px)",left:"50%",transform:"translateX(-50%)",background:"#1E293B",color:"#fff",fontSize:9,fontWeight:700,whiteSpace:"nowrap",padding:"4px 9px",borderRadius:7,pointerEvents:"none",zIndex:999,fontFamily:"'DM Sans',sans-serif"}}>
          {saved?"⭐ Koko'd!":"Removed"}
        </div>
      )}
    </div>
  );
};

// ─── MILESTONE CARD ───────────────────────────────────────────────────────────
const MilestoneCard = ({ ms, isLast, isOwner, onComplete }) => {
  const [expanded, setExpanded] = useState(ms.current || false);
  const stageColor = {Research:"#7C3AED",Prototype:"#2563EB",Testing:"#D97706",Pilot:"#10B981",Commercialization:"#0891B2"};
  const sc = stageColor[ms.stage] || "#94A3B8";
  return (
    <div style={{display:"flex",gap:14}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:28,flexShrink:0}}>
        <div onClick={()=>setExpanded(!expanded)}
          style={{width:28,height:28,borderRadius:"50%",background:ms.done?"#2563EB":ms.current?"#F59E0B":"#F1F5F9",border:`2.5px solid ${ms.done?"#2563EB":ms.current?"#F59E0B":"#CBD5E1"}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0}}>
          {ms.done && <span style={{color:"#fff",fontSize:11,fontWeight:900}}>✓</span>}
          {ms.current && <div style={{width:9,height:9,borderRadius:"50%",background:"#fff"}} />}
        </div>
        {!isLast && <div style={{width:2,flex:1,minHeight:18,background:ms.done?"#BFDBFE":"#E2E8F0",margin:"3px 0"}} />}
      </div>
      <div style={{flex:1,paddingBottom:isLast?0:16}}>
        <div onClick={()=>setExpanded(!expanded)}
          style={{cursor:"pointer",background:expanded?"#F8FAFF":"transparent",borderRadius:10,padding:"10px 14px",border:expanded?"1px solid #BFDBFE":"1px solid transparent"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:4}}>
                <Badge text={ms.stage} color={sc} sm />
                <Badge text={ms.done?"Done":ms.current?"In Progress":"Upcoming"} color={ms.done?"#10B981":ms.current?"#F59E0B":"#94A3B8"} sm />
              </div>
              <div style={{fontSize:13,fontWeight:700,color:ms.done?"#1E293B":ms.current?"#D97706":"#94A3B8",fontFamily:"'Syne',sans-serif"}}>{ms.title}</div>
            </div>
            <div style={{textAlign:"right",marginLeft:12,flexShrink:0}}>
              <div style={{fontSize:11,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>{ms.date}</div>
              {ms.pct > 0 && <div style={{fontSize:13,fontWeight:800,color:ms.done?"#10B981":ms.current?"#D97706":"#94A3B8",fontFamily:"'Syne',sans-serif"}}>{ms.pct}%</div>}
            </div>
          </div>
          {ms.pct > 0 && ms.pct < 100 && <ProgressBar value={ms.pct} color={ms.current?"#F59E0B":"#E2E8F0"} h={4} />}
        </div>
        {expanded && (
          <div style={{background:"#F8FAFF",borderRadius:10,padding:14,border:"1px solid #BFDBFE",marginBottom:8}}>
            <p style={{fontSize:12,color:"#64748B",lineHeight:1.7,margin:"0 0 10px",fontFamily:"'DM Sans',sans-serif"}}>{ms.desc}</p>
            {isOwner && ms.current && <div style={{marginTop:10}}><Btn size="sm" variant="success" onClick={onComplete}>✓ Mark Complete</Btn></div>}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── CHRONICLE ENTRY ──────────────────────────────────────────────────────────
const ChronicleEntry = ({ entry, canEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(true);
  const tc = NEWS_TYPE_COLORS[entry.type] || "#94A3B8";
  return (
    <Card style={{padding:0,overflow:"hidden"}} hover={false} accent={tc}>
      <div style={{padding:"18px 22px 14px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",alignItems:"center"}}>
            <Badge text={entry.type} color={tc} />
            {entry.tags?.map((t,i) => <Tag key={i} text={t} color={tc} />)}
          </div>
          <div style={{display:"flex",gap:7,alignItems:"center",flexShrink:0,marginLeft:10}}>
            <span style={{fontSize:11,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>{entry.date}</span>
            {canEdit && <Btn size="sm" variant="danger" onClick={()=>onDelete(entry.id)}>✕</Btn>}
          </div>
        </div>
        <h3 style={{fontSize:15,fontWeight:800,color:"#1E293B",margin:"0 0 10px",fontFamily:"'Syne',sans-serif",lineHeight:1.3}}>{entry.title}</h3>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12}}>
          <Avatar name={entry.author} size={26} color={entry.authorColor||tc} />
          <span style={{fontSize:11,color:"#64748B",fontFamily:"'DM Sans',sans-serif"}}><strong>{entry.author}</strong></span>
        </div>
        <div style={{fontSize:13,color:"#374151",lineHeight:1.8,fontFamily:"'DM Sans',sans-serif"}}>
          {expanded ? entry.body : (entry.body||"").slice(0,200)+"…"}
        </div>
        {(entry.body||"").length > 200 && (
          <button onClick={()=>setExpanded(!expanded)} style={{background:"none",border:"none",color:"#2563EB",fontSize:11,cursor:"pointer",marginTop:5,fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>
            {expanded?"Show less":"Read more"}
          </button>
        )}
        {entry.attachments?.length > 0 && (
          <div style={{marginTop:10,paddingTop:10,borderTop:"1px solid #F1F5F9"}}>
            {entry.attachments.map((a,i) => <div key={i} style={{display:"inline-flex",gap:6,alignItems:"center",background:"#F8FAFC",borderRadius:7,padding:"5px 10px",marginRight:7,fontSize:11,color:"#2563EB",fontFamily:"'DM Sans',sans-serif"}}>📎 {a}</div>)}
          </div>
        )}
      </div>
    </Card>
  );
};

// ─── ARGONAUTS CARD ───────────────────────────────────────────────────────────
const ArgonautsCard = ({ arg, onClick }) => {
  const sc = ARGONAUTS_STATUS[arg.status] || ARGONAUTS_STATUS.open;
  const approved = arg.candidates.filter(c=>c.status==="approved").length;
  return (
    <Card onClick={onClick} style={{padding:0,overflow:"hidden",cursor:"pointer"}}>
      <div style={{background:"linear-gradient(135deg,#0F172A,#1E3A8A)",padding:"18px 20px 14px",position:"relative"}}>
        <div style={{position:"absolute",top:0,right:0,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,0.04)",transform:"translate(30%,-30%)"}} />
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(255,255,255,0.12)",borderRadius:20,padding:"3px 10px"}}>
            <span style={{fontSize:10,color:"rgba(255,255,255,0.85)",fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>⚔ ARGONAUTS</span>
          </div>
          <KokoBtn type="argonauts" item={arg} size="sm" />
        </div>
        <h3 style={{fontSize:14,fontWeight:800,color:"#fff",margin:"0 0 5px",fontFamily:"'Syne',sans-serif",lineHeight:1.3}}>{arg.title}</h3>
        <div style={{fontSize:11,color:"rgba(255,255,255,0.6)",fontFamily:"'DM Sans',sans-serif"}}>{arg.org}</div>
      </div>
      <div style={{padding:"14px 20px"}}>
        <div style={{display:"flex",gap:7,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
          <Badge text={sc.label} color={sc.color} />
          <Badge text={arg.field} color={CAT_COLORS[arg.field]||"#7C3AED"} />
        </div>
        <p style={{fontSize:11,color:"#64748B",lineHeight:1.6,margin:"0 0 12px",fontFamily:"'DM Sans',sans-serif"}}>{arg.desc.slice(0,110)}…</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:12}}>
          {[{l:"Funding",v:arg.fundingCommitment,c:"#059669"},{l:"Team",v:`${approved}/${arg.teamSize}`,c:"#7C3AED"},{l:"Applicants",v:arg.applicantsCount,c:"#D97706"}].map((s,i) => (
            <div key={i} style={{background:"#F8FAFC",borderRadius:9,padding:"8px 10px",textAlign:"center",border:"1px solid #F1F5F9"}}>
              <div style={{fontSize:12,fontWeight:800,color:s.c,fontFamily:"'Syne',sans-serif"}}>{s.v}</div>
              <div style={{fontSize:8,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",letterSpacing:"0.06em"}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {arg.disciplines.slice(0,3).map((d,i) => <Tag key={i} text={d} color="#7C3AED" />)}
          {arg.disciplines.length > 3 && <Tag text={`+${arg.disciplines.length-3} more`} color="#94A3B8" />}
        </div>
      </div>
    </Card>
  );
};

// ═══════════════════════════════════════════════
//  ARGONAUTS MARKETPLACE
// ═══════════════════════════════════════════════
const ArgonautsMarketplace = ({ setPage, argonautsList, addNotif }) => {
  const [search, setSearch] = useState("");
  const [fieldFilter, setFieldFilter] = useState("All");
  const filtered = argonautsList.filter(a =>
    (fieldFilter === "All" || a.field === fieldFilter) &&
    (!search || a.title.toLowerCase().includes(search.toLowerCase()) || a.org.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div>
      <PageHeader title="Argonauts" sub="Grand Challenges requiring multidisciplinary teams." badge="⚔ ARGONAUTS"
        action={()=>setPage("post-argonauts")} actionLabel="+ Post Mission" actionColor="#7C3AED" actionIcon="⚔" />
      <Card style={{padding:16,marginBottom:18}} hover={false}>
        <div style={{display:"flex",gap:10,marginBottom:10}}>
          <div style={{flex:2}}><Input label="" value={search} onChange={setSearch} placeholder="🔍  Search Argonauts missions…" /></div>
          <div style={{flex:1}}><Sel label="Field" value={fieldFilter} onChange={setFieldFilter} options={["All",...FIELDS_LIST]} /></div>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          {Object.entries(ARGONAUTS_STATUS).map(([k,v]) => <Badge key={k} text={v.label} color={v.color} />)}
        </div>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
        {filtered.map(arg => <ArgonautsCard key={arg.id} arg={arg} onClick={()=>setPage("arg-"+arg.id)} />)}
      </div>
      {filtered.length === 0 && (
        <Card style={{padding:48,textAlign:"center"}} hover={false}>
          <div style={{fontSize:40,marginBottom:10}}>⚔</div>
          <div style={{fontSize:14,fontWeight:700,color:"#1E293B",fontFamily:"'Syne',sans-serif",marginBottom:12}}>No missions found</div>
          <Btn color="#7C3AED" onClick={()=>setPage("post-argonauts")}>Post Argonauts Mission</Btn>
        </Card>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════
//  POST / EDIT ARGONAUTS
// ═══════════════════════════════════════════════
const PostArgonautsPage = ({ setPage, addNotif, addArgonauts, editData, onUpdate }) => {
  const isEdit = !!editData;
  const [done, setDone] = useState(false);
  const [form, setForm] = useState(editData || {title:"",org:"",field:"",fundingCommitment:"",teamSize:"",desc:"",expectedImpact:"",deliverables:"",disciplines:[],tags:"",status:"open"});
  const up = (k, v) => setForm(f => ({...f,[k]:v}));
  const toggleDisc = (d) => up("disciplines", form.disciplines.includes(d) ? form.disciplines.filter(x=>x!==d) : [...form.disciplines,d]);

  if (done) return (
    <div style={{maxWidth:520,margin:"60px auto",textAlign:"center"}}>
      <div style={{fontSize:56,marginBottom:14}}>⚔</div>
      <h2 style={{fontSize:24,fontWeight:900,color:"#1E293B",marginBottom:8,fontFamily:"'Syne',sans-serif"}}>{isEdit?"Mission Updated!":"Argonauts Mission Published!"}</h2>
      <p style={{fontSize:13,color:"#64748B",lineHeight:1.8,marginBottom:22,fontFamily:"'DM Sans',sans-serif"}}>Your grand challenge is now live on the Argonauts marketplace.</p>
      <div style={{display:"flex",gap:10,justifyContent:"center"}}>
        <Btn color="#7C3AED" onClick={()=>setPage("argonauts")}>View Argonauts</Btn>
        <Btn color="#64748B" variant="outline" onClick={()=>setPage("argonauts")}>Back</Btn>
      </div>
    </div>
  );

  return (
    <div style={{maxWidth:800,margin:"0 auto"}}>
      <BackBtn onClick={()=>setPage("argonauts")} label="← Argonauts Marketplace" />
      <PageHeader title={isEdit?"Edit Argonauts Mission":"Post Argonauts Mission"} sub="Define your grand challenge and assemble the right team." badge="⚔" />
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <Card style={{padding:26}} hover={false}>
          <SectionTitle title="Mission Identity" />
          <Input label="Mission Title" value={form.title} onChange={v=>up("title",v)} placeholder="e.g. Net-Zero Smart City Infrastructure for Can Tho" required />
          <div style={{display:"flex",gap:12}}>
            <div style={{flex:1}}><Input label="Organization" value={form.org} onChange={v=>up("org",v)} placeholder="Ministry / Company name" required /></div>
            <div style={{flex:1}}><Sel label="Primary Field" value={form.field} onChange={v=>up("field",v)} options={FIELDS_LIST} required /></div>
          </div>
          <div style={{display:"flex",gap:12}}>
            <div style={{flex:1}}><Input label="Funding Commitment" value={form.fundingCommitment} onChange={v=>up("fundingCommitment",v)} placeholder="e.g. $2,500,000" /></div>
            <div style={{flex:1}}><Input label="Expected Team Size" value={form.teamSize} onChange={v=>up("teamSize",v)} type="number" placeholder="e.g. 12" /></div>
            {isEdit && <div style={{flex:1}}><Sel label="Status" value={form.status} onChange={v=>up("status",v)} options={["open","forming","launched","closed"]} /></div>}
          </div>
        </Card>
        <Card style={{padding:26}} hover={false}>
          <SectionTitle title="Mission Details" />
          <Input label="Mission Description" value={form.desc} onChange={v=>up("desc",v)} rows={4} placeholder="Describe the grand challenge…" required />
          <Input label="Expected Impact" value={form.expectedImpact} onChange={v=>up("expectedImpact",v)} rows={3} placeholder="What outcomes will this mission achieve?" />
          <Input label="Key Deliverables (one per line)" value={form.deliverables} onChange={v=>up("deliverables",v)} rows={4} placeholder={"e.g. AI diagnostic algorithm\nPortable hardware prototype"} />
        </Card>
        <Card style={{padding:26}} hover={false}>
          <SectionTitle title="Required Disciplines" sub="Select all disciplines needed for this mission" />
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            {DISCIPLINES_LIST.map(d => {
              const sel = form.disciplines.includes(d);
              return (
                <div key={d} onClick={()=>toggleDisc(d)}
                  style={{display:"flex",gap:10,alignItems:"center",padding:"10px 13px",borderRadius:10,border:`1.5px solid ${sel?"#7C3AED":"#E2E8F0"}`,background:sel?"#F5F0FF":"#fff",cursor:"pointer"}}>
                  <div style={{width:18,height:18,borderRadius:5,background:sel?"#7C3AED":"#fff",border:`2px solid ${sel?"#7C3AED":"#CBD5E1"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    {sel && <span style={{color:"#fff",fontSize:10,fontWeight:900}}>✓</span>}
                  </div>
                  <span style={{fontSize:12,color:sel?"#7C3AED":"#374151",fontWeight:sel?700:500,fontFamily:"'DM Sans',sans-serif"}}>{d}</span>
                </div>
              );
            })}
          </div>
        </Card>
        <Card style={{padding:26}} hover={false}>
          <Input label="Tags (comma-separated)" value={form.tags} onChange={v=>up("tags",v)} placeholder="e.g. CleanTech, Smart City, IoT" />
        </Card>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <Btn color="#94A3B8" variant="ghost" onClick={()=>setPage("argonauts")}>Cancel</Btn>
          <div style={{display:"flex",gap:8}}>
            {!isEdit && <Btn color="#94A3B8" variant="outline" onClick={()=>{addNotif({type:"argonauts",text:`Draft "${form.title||"Untitled"}" saved.`});setPage("argonauts");}}>Save Draft</Btn>}
            <Btn color="#7C3AED" size="lg" icon="⚔" onClick={()=>{
              if (!form.title || !form.field) return;
              if (isEdit) { onUpdate({...editData,...form}); setDone(true); }
              else {
                addArgonauts({id:"arg"+Date.now(),status:"open",applicantsCount:0,candidates:[],chronicle:[],suggestedExperts:[],linkedProjectId:null,createdBy:"u2",...form,teamSize:parseInt(form.teamSize)||8,tags:form.tags.split(",").map(s=>s.trim()).filter(Boolean),deliverables:typeof form.deliverables==="string"?form.deliverables.split("\n").filter(Boolean):form.deliverables});
                setDone(true);
                addNotif({type:"argonauts",text:`"${form.title}" mission published!`});
              }
            }}>{isEdit?"Update Mission":"Publish Argonauts"}</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════
//  ARGONAUTS DETAIL PAGE
// ═══════════════════════════════════════════════
const ArgonautsDetailPage = ({ arg, setPage, role, addNotif, updateArgonauts }) => {
  const [tab, setTab] = useState("overview");
  const [applyOpen, setApplyOpen] = useState(false);
  const [teamApplyOpen, setTeamApplyOpen] = useState(false);
  const [applyForm, setApplyForm] = useState({discipline:"",motivation:"",expertise:""});
  const [teamForm, setTeamForm] = useState({teamName:"",teamLeader:"",members:"",experience:"",proposal:""});
  const [invitesSent, setInvitesSent] = useState({});
  const [candidates, setCandidates] = useState(arg.candidates || []);
  const [chronicle, setChronicle] = useState(arg.chronicle || []);
  const [chronicleOpen, setChronicleOpen] = useState(false);
  const [chronicleForm, setChronicleForm] = useState({type:"update",title:"",body:""});
  const [appliedIndividual, setAppliedIndividual] = useState(false);
  const [appliedTeam, setAppliedTeam] = useState(false);
  const [projectFormed, setProjectFormed] = useState(!!arg.linkedProjectId);

  const uid = {innovator:"u1",seeker:"u2",investor:"u3",admin:"u4"}[role];
  const isOwner = arg.createdBy === uid || role === "admin";
  const sc = ARGONAUTS_STATUS[arg.status] || ARGONAUTS_STATUS.open;
  const approvedCandidates = candidates.filter(c=>c.status==="approved");
  const pendingCandidates = candidates.filter(c=>c.status==="pending");
  const disciplinesHit = new Set(approvedCandidates.map(c=>c.discipline));
  const formationPct = Math.round((disciplinesHit.size / Math.max(1,arg.disciplines.length)) * 100);
  const candidatesByDisc = arg.disciplines.reduce((acc,d) => { acc[d]=candidates.filter(c=>c.discipline===d); return acc; }, {});

  const handleApprove = (cid) => setCandidates(p=>p.map(c=>c.id===cid?{...c,status:"approved"}:c));
  const handleReject = (cid) => setCandidates(p=>p.map(c=>c.id===cid?{...c,status:"rejected"}:c));
  const handleFormProject = () => {
    setProjectFormed(true);
    updateArgonauts({...arg,status:"launched",linkedProjectId:"proj-arg-"+arg.id,candidates});
    addNotif({type:"formed",text:`Project formed from Argonauts "${arg.title}"!`});
  };
  const inviteExpert = (ex) => {
    setInvitesSent(p=>({...p,[ex.id]:true}));
    addNotif({type:"invite",text:`Invitation sent to ${ex.name} for "${arg.title}".`});
    setCandidates(p=>[...p,{id:"cand"+Date.now(),name:ex.name,userId:ex.id,discipline:ex.tags[0]||"AI & Machine Learning",type:"invited",status:"pending",motivation:"Invited expert.",expertise:ex.expertise,date:new Date().toISOString().split("T")[0]}]);
  };

  const allTabs = [
    {id:"overview",label:"Overview",icon:"◈"},
    {id:"chronicle",label:"Chronicle",icon:"📜",count:chronicle.length},
    {id:"candidates",label:"Candidates",icon:"👥",count:candidates.length},
    {id:"formation",label:"Team Formation",icon:"⚔"},
    {id:"experts",label:"Suggested Experts",icon:"✨",count:arg.suggestedExperts?.length||0},
  ];

  return (
    <div>
      <BackBtn onClick={()=>setPage("argonauts")} label="← Argonauts Marketplace" />
      {/* Hero */}
      <div style={{background:"linear-gradient(135deg,#0F172A 0%,#1E3A8A 55%,#7C3AED 100%)",borderRadius:20,padding:"36px 38px",marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-60,right:-60,width:300,height:300,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}} />
        <div style={{position:"relative"}}>
          <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(255,255,255,0.12)",borderRadius:20,padding:"4px 14px"}}>
              <span style={{fontSize:10,color:"rgba(255,255,255,0.9)",fontWeight:800,fontFamily:"'DM Sans',sans-serif",letterSpacing:"0.08em"}}>⚔ ARGONAUTS MISSION</span>
            </div>
            <div style={{background:sc.color,borderRadius:20,padding:"3px 12px"}}>
              <span style={{fontSize:10,fontWeight:700,color:"#fff",fontFamily:"'DM Sans',sans-serif"}}>{sc.icon} {sc.label}</span>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}>
            <h1 style={{fontSize:26,fontWeight:900,color:"#fff",margin:0,fontFamily:"'Syne',sans-serif",lineHeight:1.2,flex:1}}>{arg.title}</h1>
            <KokoBtn type="argonauts" item={arg} size="md" />
          </div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.65)",marginBottom:16,fontFamily:"'DM Sans',sans-serif"}}>{arg.org}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginBottom:16}}>
            {[{l:"Funding",v:arg.fundingCommitment,c:"#34D399"},{l:"Team Size",v:arg.teamSize,c:"#A78BFA"},{l:"Disciplines",v:arg.disciplines.length,c:"#60A5FA"},{l:"Applicants",v:candidates.length,c:"#FCD34D"}].map((s,i) => (
              <div key={i} style={{background:"rgba(255,255,255,0.1)",borderRadius:12,padding:"12px 14px",textAlign:"center"}}>
                <div style={{fontSize:18,fontWeight:900,color:s.c,fontFamily:"'Syne',sans-serif",lineHeight:1}}>{s.v}</div>
                <div style={{fontSize:9,color:"rgba(255,255,255,0.6)",fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase",letterSpacing:"0.07em",marginTop:3}}>{s.l}</div>
              </div>
            ))}
          </div>
          {!isOwner && (
            <div style={{display:"flex",gap:10}}>
              {!appliedIndividual
                ? <Btn color="#fff" style={{color:"#1E293B"}} onClick={()=>setApplyOpen(true)} icon="👤">Apply as Individual</Btn>
                : <Badge text="✅ Applied" color="#10B981" />}
              {!appliedTeam
                ? <Btn color="#7C3AED" variant="outline" style={{borderColor:"rgba(255,255,255,0.4)",color:"#fff"}} onClick={()=>setTeamApplyOpen(true)} icon="👥">Apply as Team</Btn>
                : <Badge text="✅ Team Applied" color="#A78BFA" />}
            </div>
          )}
          {isOwner && <Btn color="#fff" style={{color:"#1E293B"}} onClick={()=>setPage("edit-arg-"+arg.id)} icon="✏️">Edit Mission</Btn>}
        </div>
      </div>

      <div style={{marginBottom:20}}><Tabs tabs={allTabs} active={tab} onChange={setTab} /></div>

      {/* TAB: OVERVIEW */}
      {tab === "overview" && (
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:18}}>
          <div>
            <Card style={{padding:24,marginBottom:14}} hover={false}>
              <SectionTitle title="Mission Description" />
              <p style={{fontSize:13,color:"#374151",lineHeight:1.85,marginBottom:16,fontFamily:"'DM Sans',sans-serif"}}>{arg.desc}</p>
              <SectionTitle title="Expected Impact" />
              <p style={{fontSize:13,color:"#374151",lineHeight:1.85,marginBottom:16,fontFamily:"'DM Sans',sans-serif"}}>{arg.expectedImpact}</p>
              <SectionTitle title="Key Deliverables" />
              <div style={{display:"flex",flexDirection:"column",gap:6}}>
                {(Array.isArray(arg.deliverables)?arg.deliverables:(arg.deliverables||"").split("\n")).filter(Boolean).map((d,i) => (
                  <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",padding:"10px 13px",background:"#F8FAFC",borderRadius:9,border:"1px solid #E8EDFB"}}>
                    <div style={{width:20,height:20,borderRadius:6,background:"#7C3AED",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                      <span style={{color:"#fff",fontSize:9,fontWeight:900}}>{i+1}</span>
                    </div>
                    <span style={{fontSize:12,color:"#374151",fontFamily:"'DM Sans',sans-serif",lineHeight:1.5}}>{d}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card style={{padding:24}} hover={false}>
              <SectionTitle title="Required Disciplines" />
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                {arg.disciplines.map((d,i) => {
                  const covered = disciplinesHit.has(d);
                  return (
                    <div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"9px 12px",borderRadius:9,background:covered?"#F0FDF4":"#F8FAFC",border:`1px solid ${covered?"#A7F3D0":"#E2E8F0"}`}}>
                      <span style={{fontSize:14}}>{covered?"✅":"⬜"}</span>
                      <span style={{fontSize:11,fontWeight:covered?700:500,color:covered?"#059669":"#374151",fontFamily:"'DM Sans',sans-serif"}}>{d}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
          <div>
            <Card style={{padding:20,marginBottom:12}} hover={false}>
              <SectionTitle title="Team Formation" />
              <div style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                  <span style={{fontSize:11,color:"#64748B",fontFamily:"'DM Sans',sans-serif"}}>Disciplines covered</span>
                  <span style={{fontSize:13,fontWeight:800,color:"#7C3AED",fontFamily:"'Syne',sans-serif"}}>{formationPct}%</span>
                </div>
                <ProgressBar value={formationPct} color="#7C3AED" h={8} />
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
                <div style={{background:"#EFF6FF",borderRadius:9,padding:10,textAlign:"center"}}><div style={{fontSize:18,fontWeight:900,color:"#2563EB",fontFamily:"'Syne',sans-serif"}}>{approvedCandidates.length}</div><div style={{fontSize:9,color:"#64748B",fontFamily:"'DM Sans',sans-serif"}}>Approved</div></div>
                <div style={{background:"#FFFBEB",borderRadius:9,padding:10,textAlign:"center"}}><div style={{fontSize:18,fontWeight:900,color:"#D97706",fontFamily:"'Syne',sans-serif"}}>{pendingCandidates.length}</div><div style={{fontSize:9,color:"#64748B",fontFamily:"'DM Sans',sans-serif"}}>Pending</div></div>
              </div>
              {isOwner && approvedCandidates.length >= 2 && !projectFormed && <Btn full color="#7C3AED" onClick={handleFormProject} icon="🚀">Form Project Team</Btn>}
              {projectFormed && <div style={{background:"#F0FDF4",border:"1px solid #A7F3D0",borderRadius:9,padding:"10px 13px",textAlign:"center"}}><div style={{fontSize:11,fontWeight:700,color:"#059669",fontFamily:"'DM Sans',sans-serif"}}>🚀 Project launched!</div></div>}
            </Card>
            <Card style={{padding:20}} hover={false}>
              <SectionTitle title="Tags" />
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{arg.tags?.map((t,i) => <Tag key={i} text={t} color="#7C3AED" />)}</div>
            </Card>
          </div>
        </div>
      )}

      {/* TAB: CHRONICLE */}
      {tab === "chronicle" && (
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div>
              <h2 style={{fontSize:16,fontWeight:800,color:"#1E293B",margin:0,fontFamily:"'Syne',sans-serif"}}>📜 Chronicle</h2>
              <p style={{fontSize:11,color:"#94A3B8",margin:"2px 0 0",fontFamily:"'DM Sans',sans-serif"}}>Mission progress & updates</p>
            </div>
            {isOwner && <Btn color="#7C3AED" onClick={()=>setChronicleOpen(true)} icon="📜">Add Entry</Btn>}
          </div>
          {chronicle.length === 0 && <Card style={{padding:40,textAlign:"center"}} hover={false}><div style={{fontSize:36,marginBottom:10}}>📜</div><div style={{fontSize:13,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>No chronicle entries yet.</div></Card>}
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {chronicle.map(e => <ChronicleEntry key={e.id} entry={e} canEdit={isOwner} onDelete={id=>setChronicle(p=>p.filter(x=>x.id!==id))} />)}
          </div>
        </div>
      )}

      {/* TAB: CANDIDATES */}
      {tab === "candidates" && (
        <div>
          <SectionTitle title="Argonauts Candidate Pool" sub={`${candidates.length} total · ${approvedCandidates.length} approved`} />
          {arg.disciplines.map(disc => {
            const group = candidatesByDisc[disc] || [];
            return (
              <div key={disc} style={{marginBottom:18}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
                  <h3 style={{fontSize:13,fontWeight:700,color:"#1E293B",margin:0,fontFamily:"'Syne',sans-serif"}}>{disc}</h3>
                  <Badge text={`${group.length} candidates`} color="#7C3AED" sm />
                </div>
                {group.length === 0 && <div style={{fontSize:11,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif",padding:"8px 0"}}>No candidates yet.</div>}
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {group.map(cand => (
                    <Card key={cand.id} style={{padding:18}} hover={false}>
                      <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                        <Avatar name={cand.name} size={38} color={cand.status==="approved"?"#10B981":cand.status==="rejected"?"#EF4444":"#7C3AED"} />
                        <div style={{flex:1}}>
                          <div style={{display:"flex",gap:6,marginBottom:5,flexWrap:"wrap",alignItems:"center"}}>
                            <span style={{fontSize:13,fontWeight:700,color:"#1E293B",fontFamily:"'Syne',sans-serif"}}>{cand.name}</span>
                            <Badge text={cand.type==="invited"?"Invited":"Applied"} color={cand.type==="invited"?"#0891B2":"#7C3AED"} sm />
                            <Badge text={cand.status==="approved"?"✓ Approved":cand.status==="rejected"?"✗ Rejected":"Pending"} color={cand.status==="approved"?"#10B981":cand.status==="rejected"?"#EF4444":"#F59E0B"} sm />
                          </div>
                          <div style={{fontSize:11,color:"#64748B",marginBottom:6,fontFamily:"'DM Sans',sans-serif"}}>{cand.expertise}</div>
                          <div style={{fontSize:12,color:"#374151",background:"#F8FAFC",borderRadius:8,padding:"7px 10px",fontFamily:"'DM Sans',sans-serif"}}>{cand.motivation}</div>
                        </div>
                        {isOwner && cand.status === "pending" && (
                          <div style={{display:"flex",gap:6,flexShrink:0}}>
                            <Btn size="sm" variant="success" onClick={()=>{handleApprove(cand.id);addNotif({type:"candidate",text:`${cand.name} approved!`});}}>✓ Approve</Btn>
                            <Btn size="sm" variant="danger" onClick={()=>handleReject(cand.id)}>✕ Reject</Btn>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB: FORMATION */}
      {tab === "formation" && (
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:18}}>
          <div>
            <Card style={{padding:22,marginBottom:14}} hover={false}>
              <SectionTitle title="Discipline Coverage" />
              {arg.disciplines.map((d,i) => {
                const covered = disciplinesHit.has(d);
                const members = approvedCandidates.filter(c=>c.discipline===d);
                return (
                  <div key={i} style={{display:"flex",gap:12,alignItems:"center",padding:"11px 0",borderBottom:i<arg.disciplines.length-1?"1px solid #F1F5F9":"none"}}>
                    <div style={{width:26,height:26,borderRadius:7,background:covered?"#10B981":"#F1F5F9",border:`2px solid ${covered?"#10B981":"#E2E8F0"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{color:covered?"#fff":"#CBD5E1",fontSize:11,fontWeight:900}}>{covered?"✓":"○"}</span>
                    </div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:700,color:covered?"#1E293B":"#94A3B8",fontFamily:"'Syne',sans-serif"}}>{d}</div>
                      {members.length > 0 && <div style={{fontSize:10,color:"#059669",fontFamily:"'DM Sans',sans-serif"}}>{members.map(m=>m.name).join(", ")}</div>}
                    </div>
                    <Badge text={covered?"✔ Covered":"✖ Needed"} color={covered?"#10B981":"#EF4444"} sm />
                  </div>
                );
              })}
            </Card>
            <Card style={{padding:22}} hover={false}>
              <SectionTitle title="Approved Team Members" sub={`${approvedCandidates.length} of ${arg.teamSize} needed`} />
              {approvedCandidates.length === 0 && <div style={{textAlign:"center",padding:24,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif",fontSize:12}}>No approved members yet.</div>}
              {approvedCandidates.map((m,i) => (
                <div key={m.id} style={{display:"flex",gap:10,alignItems:"center",padding:"10px 0",borderBottom:i<approvedCandidates.length-1?"1px solid #F1F5F9":"none"}}>
                  <Avatar name={m.name} size={34} color="#10B981" />
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#1E293B",fontFamily:"'Syne',sans-serif"}}>{m.name}</div>
                    <div style={{fontSize:10,color:"#64748B",fontFamily:"'DM Sans',sans-serif"}}>{m.discipline}</div>
                  </div>
                  <Badge text={m.type==="invited"?"Invited":"Applied"} color="#7C3AED" sm />
                </div>
              ))}
            </Card>
          </div>
          <div>
            <Card style={{padding:20}} hover={false}>
              <div style={{textAlign:"center",marginBottom:14}}>
                <div style={{fontSize:42,fontWeight:900,color:"#7C3AED",fontFamily:"'Syne',sans-serif",lineHeight:1}}>{formationPct}%</div>
                <div style={{fontSize:11,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>Team coverage</div>
                <div style={{marginTop:8}}><ProgressBar value={formationPct} color="#7C3AED" h={9} /></div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:16}}>
                <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:"#64748B",fontFamily:"'DM Sans',sans-serif"}}>Disciplines covered</span><span style={{fontSize:12,fontWeight:700,color:"#1E293B",fontFamily:"'Syne',sans-serif"}}>{disciplinesHit.size}/{arg.disciplines.length}</span></div>
                <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:12,color:"#64748B",fontFamily:"'DM Sans',sans-serif"}}>Members approved</span><span style={{fontSize:12,fontWeight:700,color:"#1E293B",fontFamily:"'Syne',sans-serif"}}>{approvedCandidates.length}/{arg.teamSize}</span></div>
              </div>
              {isOwner && !projectFormed && (
                approvedCandidates.length >= 2
                  ? <Btn full color="#7C3AED" onClick={handleFormProject} icon="🚀">Form Project Team</Btn>
                  : <div style={{background:"#F8FAFC",borderRadius:9,padding:11,textAlign:"center",fontSize:11,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>Approve at least 2 candidates to form a team.</div>
              )}
              {projectFormed && <div style={{background:"linear-gradient(135deg,#F0FDF4,#DCFCE7)",border:"1px solid #A7F3D0",borderRadius:12,padding:14,textAlign:"center"}}><div style={{fontSize:24,marginBottom:5}}>🚀</div><div style={{fontSize:12,fontWeight:700,color:"#059669",fontFamily:"'Syne',sans-serif"}}>Project Launched!</div></div>}
            </Card>
          </div>
        </div>
      )}

      {/* TAB: EXPERTS */}
      {tab === "experts" && (
        <div>
          <SectionTitle title="Suggested Experts" sub="AI-matched based on disciplines, past innovations & tags" />
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {(arg.suggestedExperts || []).map((ex,i) => (
              <Card key={i} style={{padding:22}}>
                <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:12}}>
                  <Avatar name={ex.name} size={42} color={ex.color||"#7C3AED"} />
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:700,color:"#1E293B",fontFamily:"'Syne',sans-serif"}}>{ex.name}</div>
                    <div style={{fontSize:11,color:"#64748B",fontFamily:"'DM Sans',sans-serif"}}>{ex.dept}</div>
                    <div style={{fontSize:11,color:"#374151",fontFamily:"'DM Sans',sans-serif",marginTop:2}}>{ex.expertise}</div>
                  </div>
                </div>
                <div style={{background:"#F5F0FF",border:"1px solid #DDD6FE",borderRadius:8,padding:"7px 10px",marginBottom:10}}>
                  <div style={{fontSize:10,color:"#7C3AED",fontFamily:"'DM Sans',sans-serif"}}>💡 {ex.matchReason}</div>
                </div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
                  {ex.tags.map((t,j) => <Tag key={j} text={t} color="#7C3AED" />)}
                </div>
                {isOwner && (invitesSent[ex.id]
                  ? <Badge text="✉️ Invitation Sent" color="#10B981" />
                  : <Btn full color="#7C3AED" onClick={()=>inviteExpert(ex)} icon="✉️">Invite to Argonauts</Btn>
                )}
              </Card>
            ))}
            {(!arg.suggestedExperts || arg.suggestedExperts.length === 0) && <div style={{gridColumn:"1/-1",textAlign:"center",padding:40,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>No expert suggestions yet.</div>}
          </div>
        </div>
      )}

      {/* MODALS */}
      <Modal open={applyOpen} onClose={()=>setApplyOpen(false)} title="Apply as Individual">
        <Sel label="Your Discipline" value={applyForm.discipline} onChange={v=>setApplyForm(f=>({...f,discipline:v}))} options={arg.disciplines} required />
        <Input label="Motivation" value={applyForm.motivation} onChange={v=>setApplyForm(f=>({...f,motivation:v}))} rows={3} placeholder="Why do you want to join this Argonauts mission?" required />
        <Input label="Relevant Expertise" value={applyForm.expertise} onChange={v=>setApplyForm(f=>({...f,expertise:v}))} placeholder="e.g. Computer Vision, IoT, ML" required />
        <div style={{display:"flex",gap:8}}>
          <Btn full color="#7C3AED" onClick={()=>{if(applyForm.discipline&&applyForm.motivation){setCandidates(p=>[...p,{id:"cand"+Date.now(),name:"You (Dr. Nguyen Thi Lan)",userId:"u1",discipline:applyForm.discipline,type:"applicant",status:"pending",motivation:applyForm.motivation,expertise:applyForm.expertise,date:new Date().toISOString().split("T")[0]}]);setApplyOpen(false);setAppliedIndividual(true);addNotif({type:"candidate",text:`Application submitted to "${arg.title}".`});}}}>Submit →</Btn>
          <Btn full color="#EF4444" variant="outline" onClick={()=>setApplyOpen(false)}>Cancel</Btn>
        </div>
      </Modal>

      <Modal open={teamApplyOpen} onClose={()=>setTeamApplyOpen(false)} title="Apply as Team" wide>
        <Input label="Team Name" value={teamForm.teamName} onChange={v=>setTeamForm(f=>({...f,teamName:v}))} placeholder="e.g. FIT Lab Alpha Team" required />
        <Input label="Team Leader" value={teamForm.teamLeader} onChange={v=>setTeamForm(f=>({...f,teamLeader:v}))} placeholder="Full name of team leader" required />
        <Input label="Team Members (comma-separated)" value={teamForm.members} onChange={v=>setTeamForm(f=>({...f,members:v}))} placeholder="e.g. Dr. Lan, Prof. Duc, Dr. An" />
        <Input label="Relevant Experience" value={teamForm.experience} onChange={v=>setTeamForm(f=>({...f,experience:v}))} rows={3} placeholder="Describe your team's collective experience…" required />
        <Input label="Short Proposal" value={teamForm.proposal} onChange={v=>setTeamForm(f=>({...f,proposal:v}))} rows={4} placeholder="Outline your approach to this Argonauts mission…" required />
        <div style={{display:"flex",gap:8}}>
          <Btn full color="#7C3AED" onClick={()=>{if(teamForm.teamName&&teamForm.proposal){setTeamApplyOpen(false);setAppliedTeam(true);addNotif({type:"candidate",text:`Team "${teamForm.teamName}" applied to "${arg.title}".`});}}}>Submit Team Application →</Btn>
          <Btn full color="#EF4444" variant="outline" onClick={()=>setTeamApplyOpen(false)}>Cancel</Btn>
        </div>
      </Modal>

      <Modal open={chronicleOpen} onClose={()=>setChronicleOpen(false)} title="Add Chronicle Entry">
        <Sel label="Type" value={chronicleForm.type} onChange={v=>setChronicleForm(f=>({...f,type:v}))} options={["update","milestone","announcement","research","funding"]} />
        <Input label="Title" value={chronicleForm.title} onChange={v=>setChronicleForm(f=>({...f,title:v}))} placeholder="Chronicle entry title" required />
        <Input label="Content" value={chronicleForm.body} onChange={v=>setChronicleForm(f=>({...f,body:v}))} rows={5} placeholder="Describe this mission update…" required />
        <div style={{display:"flex",gap:8}}>
          <Btn full color="#7C3AED" onClick={()=>{if(chronicleForm.title){setChronicle(p=>[{id:"ch"+Date.now(),author:arg.org,authorColor:"#7C3AED",date:new Date().toISOString().split("T")[0],...chronicleForm,tags:[],attachments:[]}, ...p]);setChronicleOpen(false);setChronicleForm({type:"update",title:"",body:""});}}} >Post Entry</Btn>
          <Btn full color="#EF4444" variant="outline" onClick={()=>setChronicleOpen(false)}>Cancel</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════
//  KOKO PAGE
// ═══════════════════════════════════════════════
const KokoPage = ({ setPage }) => {
  const { koko, removeKoko } = useKoko();
  const [tab, setTab] = useState("innovations");
  const total = koko.innovations.length + koko.argonauts.length + koko.challenges.length + koko.projects.length + koko.roles.length;

  const EmptyState = ({ icon, label, actionLabel, actionPage }) => (
    <Card style={{padding:48,textAlign:"center"}} hover={false}>
      <div style={{fontSize:42,marginBottom:12}}>{icon}</div>
      <div style={{fontSize:15,fontWeight:700,color:"#1E293B",fontFamily:"'Syne',sans-serif",marginBottom:6}}>No {label} in Koko yet</div>
      <div style={{fontSize:12,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif",marginBottom:16}}>Click ☆ on any item to add it to your Koko.</div>
      <Btn color="#2563EB" onClick={()=>setPage(actionPage)}>Browse {actionLabel} →</Btn>
    </Card>
  );

  return (
    <div>
      <PageHeader title="Koko" sub={`${total} items in your collection`} badge="⭐ KOKO" />
      <div style={{marginBottom:20}}>
        <Tabs tabs={[
          {id:"innovations",label:"Innovations",icon:"◈",count:koko.innovations.length},
          {id:"argonauts",label:"Argonauts",icon:"⚔",count:koko.argonauts.length},
          {id:"challenges",label:"Challenges",icon:"◎",count:koko.challenges.length},
          {id:"projects",label:"Projects",icon:"🤝",count:koko.projects.length},
          {id:"roles",label:"Roles",icon:"👥",count:koko.roles.length},
        ]} active={tab} onChange={setTab} />
      </div>

      {tab === "innovations" && (
        koko.innovations.length === 0
          ? <EmptyState icon="◈" label="innovations" actionLabel="Innovations" actionPage="innovations" />
          : <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
              {koko.innovations.map(ip => (
                <Card key={ip.id} style={{padding:20}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                    <Badge text={ip.field} color={CAT_COLORS[ip.field]||"#2563EB"} />
                    <div style={{display:"flex",gap:6,alignItems:"center"}}><TRLBadge level={ip.trl} /><KokoBtn type="innovations" item={ip} size="sm" /></div>
                  </div>
                  <h3 style={{fontSize:13,fontWeight:700,color:"#1E293B",margin:"0 0 5px",fontFamily:"'Syne',sans-serif",lineHeight:1.4}}>{ip.title}</h3>
                  <p style={{fontSize:11,color:"#64748B",lineHeight:1.6,margin:"0 0 10px",fontFamily:"'DM Sans',sans-serif"}}>{ip.desc}</p>
                  <TRLMeter level={ip.trl} />
                  <div style={{height:1,background:"#F1F5F9",margin:"10px 0"}} />
                  <div style={{display:"flex",gap:7}}>
                    <Btn size="sm" color="#2563EB" onClick={()=>setPage("ip-"+ip.id)}>View →</Btn>
                    <Btn size="sm" color="#EF4444" variant="outline" onClick={()=>removeKoko("innovations",ip.id)}>Remove</Btn>
                  </div>
                </Card>
              ))}
            </div>
      )}

      {tab === "argonauts" && (
        koko.argonauts.length === 0
          ? <EmptyState icon="⚔" label="Argonauts missions" actionLabel="Argonauts" actionPage="argonauts" />
          : <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:16}}>
              {koko.argonauts.map(arg => {
                const sc = ARGONAUTS_STATUS[arg.status] || ARGONAUTS_STATUS.open;
                return (
                  <Card key={arg.id} style={{padding:0,overflow:"hidden"}}>
                    <div style={{background:"linear-gradient(135deg,#0F172A,#1E3A8A)",padding:"18px 20px 14px"}}>
                      <div style={{display:"flex",gap:7,marginBottom:8,flexWrap:"wrap",alignItems:"center"}}>
                        <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(255,255,255,0.12)",borderRadius:20,padding:"3px 10px"}}><span style={{fontSize:9,color:"rgba(255,255,255,0.85)",fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>⚔ ARGONAUTS</span></div>
                        <Badge text={sc.label} color={sc.color} />
                      </div>
                      <h3 style={{fontSize:14,fontWeight:800,color:"#fff",margin:"0 0 3px",fontFamily:"'Syne',sans-serif"}}>{arg.title}</h3>
                      <div style={{fontSize:10,color:"rgba(255,255,255,0.6)"}}>{arg.org}</div>
                    </div>
                    <div style={{padding:"14px 18px"}}>
                      <p style={{fontSize:11,color:"#64748B",lineHeight:1.6,margin:"0 0 10px",fontFamily:"'DM Sans',sans-serif"}}>{arg.desc?.slice(0,100)}…</p>
                      <div style={{fontSize:12,fontWeight:800,color:"#059669",fontFamily:"'Syne',sans-serif",marginBottom:10}}>{arg.fundingCommitment}</div>
                      <div style={{display:"flex",gap:7}}>
                        <Btn size="sm" color="#7C3AED" onClick={()=>setPage("arg-"+arg.id)}>View Mission →</Btn>
                        <Btn size="sm" color="#EF4444" variant="outline" onClick={()=>removeKoko("argonauts",arg.id)}>Remove</Btn>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
      )}

      {tab === "challenges" && (
        koko.challenges.length === 0
          ? <EmptyState icon="◎" label="challenges" actionLabel="Challenges" actionPage="challenges" />
          : <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {koko.challenges.map(ch => (
                <Card key={ch.id} style={{padding:22}} hover={false}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",gap:7,marginBottom:8,flexWrap:"wrap"}}><Badge text={ch.industry} color={CAT_COLORS[ch.industry]||"#D97706"} /><Badge text="OPEN" color="#10B981" /></div>
                      <h3 style={{fontSize:14,fontWeight:700,color:"#1E293B",margin:"0 0 4px",fontFamily:"'Syne',sans-serif"}}>{ch.title}</h3>
                      <div style={{fontSize:11,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>{ch.org} · {ch.deadline}</div>
                    </div>
                    <div style={{textAlign:"right",marginLeft:20,flexShrink:0}}>
                      <KokoBtn type="challenges" item={ch} size="sm" />
                      <div style={{fontSize:22,fontWeight:900,color:"#D97706",fontFamily:"'Syne',sans-serif",marginTop:6}}>{ch.reward}</div>
                    </div>
                  </div>
                  <div style={{display:"flex",gap:8,marginTop:12}}>
                    <Btn size="sm" color="#D97706" onClick={()=>setPage("challenges")}>View →</Btn>
                    <Btn size="sm" color="#EF4444" variant="outline" onClick={()=>removeKoko("challenges",ch.id)}>Remove</Btn>
                  </div>
                </Card>
              ))}
            </div>
      )}

      {tab === "projects" && (
        koko.projects.length === 0
          ? <EmptyState icon="🤝" label="projects" actionLabel="Projects" actionPage="my-projects" />
          : <div style={{display:"flex",flexDirection:"column",gap:14}}>
              {koko.projects.map(p => (
                <Card key={p.id} style={{padding:22}} hover={false}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",gap:7,marginBottom:8,alignItems:"center"}}><Badge text="Active" color="#2563EB" /><Badge text={p.stage} color="#7C3AED" /><KokoBtn type="projects" item={p} size="sm" /></div>
                      <h3 style={{fontSize:15,fontWeight:800,color:"#1E293B",margin:"0 0 3px",fontFamily:"'Syne',sans-serif"}}>{p.title}</h3>
                    </div>
                    <div style={{fontSize:26,fontWeight:900,color:"#2563EB",fontFamily:"'Syne',sans-serif",marginLeft:20}}>{p.progress}%</div>
                  </div>
                  <ProgressBar value={p.progress} color="#2563EB" h={5} />
                  <div style={{display:"flex",gap:7,marginTop:12}}>
                    <Btn size="sm" color="#2563EB" onClick={()=>setPage("ip-"+p.ipId)}>Open Workspace →</Btn>
                    <Btn size="sm" color="#EF4444" variant="outline" onClick={()=>removeKoko("projects",p.id)}>Remove</Btn>
                  </div>
                </Card>
              ))}
            </div>
      )}

      {tab === "roles" && (
        koko.roles.length === 0
          ? <EmptyState icon="👥" label="roles" actionLabel="Roles" actionPage="recruitment" />
          : <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {koko.roles.map(r => (
                <Card key={r.id} style={{padding:22}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                    <div style={{flex:1}}><Badge text={r.field} color={CAT_COLORS[r.field]||"#7C3AED"} /><h3 style={{fontSize:14,fontWeight:800,color:"#1E293B",margin:"6px 0 3px",fontFamily:"'Syne',sans-serif"}}>{r.role}</h3></div>
                    <KokoBtn type="roles" item={r} size="sm" />
                  </div>
                  <div style={{display:"flex",gap:7,paddingTop:10,borderTop:"1px solid #F1F5F9"}}>
                    <Btn size="sm" color="#D97706" onClick={()=>setPage("recruitment")}>View →</Btn>
                    <Btn size="sm" color="#EF4444" variant="outline" onClick={()=>removeKoko("roles",r.id)}>Remove</Btn>
                  </div>
                </Card>
              ))}
            </div>
      )}
    </div>
  );
};

// ─── KOKO WIDGET ──────────────────────────────────────────────────────────────
const KokoWidget = ({ setPage }) => {
  const { koko } = useKoko();
  const total = koko.innovations.length + koko.argonauts.length + koko.challenges.length + koko.projects.length + koko.roles.length;
  const recentItems = [
    ...koko.argonauts.slice(-2).map(a=>({icon:"⚔",label:a.title,type:"Argonauts",color:"#7C3AED"})),
    ...koko.innovations.slice(-2).map(i=>({icon:"◈",label:i.title,type:"Innovation",color:CAT_COLORS[i.field]||"#2563EB"})),
    ...koko.challenges.slice(-1).map(c=>({icon:"◎",label:c.title,type:"Challenge",color:"#D97706"})),
  ].slice(-4).reverse();
  return (
    <Card style={{padding:20}} hover={false}>
      <SectionTitle title="⭐ Koko" sub={`${total} items`} action={()=>setPage("koko")} actionLabel="View All →" />
      {total === 0
        ? <div style={{textAlign:"center",padding:"16px 0",color:"#94A3B8",fontFamily:"'DM Sans',sans-serif",fontSize:12}}><div style={{fontSize:26,marginBottom:6}}>☆</div>Add items to your Koko collection</div>
        : <div style={{display:"flex",flexDirection:"column",gap:7}}>
            {recentItems.map((it,i) => (
              <div key={i} style={{display:"flex",gap:9,alignItems:"center",padding:"8px 10px",background:`${it.color}08`,borderRadius:10,border:`1px solid ${it.color}18`}}>
                <div style={{width:26,height:26,borderRadius:7,background:`${it.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>{it.icon}</div>
                <div style={{flex:1,overflow:"hidden"}}>
                  <div style={{fontSize:12,fontWeight:600,color:"#1E293B",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{it.label}</div>
                  <div style={{fontSize:9,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif",textTransform:"uppercase"}}>{it.type}</div>
                </div>
                <span style={{fontSize:13,color:it.color}}>⭐</span>
              </div>
            ))}
            <Btn full color="#F59E0B" variant="soft" size="sm" icon="⭐" onClick={()=>setPage("koko")} style={{marginTop:4}}>View All Koko Items</Btn>
          </div>
      }
    </Card>
  );
};

// ═══════════════════════════════════════════════
//  IP DETAIL PAGE
// ═══════════════════════════════════════════════
const IPDetailPage = ({ ip, project, setPage, role, addNotif }) => {
  const [tab, setTab] = useState("overview");
  const [ndaOk, setNdaOk] = useState(false);
  const [ndaOpen, setNdaOpen] = useState(false);
  const [interested, setInterested] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [msgText, setMsgText] = useState("");
  const [discussions, setDiscussions] = useState([{id:"d1",from:"Project Team",text:"Welcome to the project workspace!",time:"1d ago",color:"#2563EB"}]);
  const [chatMsg, setChatMsg] = useState("");
  const [chronicle, setChronicle] = useState(project?.chronicle || []);
  const [chronicleOpen, setChronicleOpen] = useState(false);
  const [chronicleForm, setChronicleForm] = useState({type:"update",title:"",body:""});

  if (!ip) return <div style={{padding:60,textAlign:"center",color:"#94A3B8"}}>IP not found.</div>;

  const uid = {innovator:"u1",seeker:"u2",investor:"u3",admin:"u4"}[role];
  const myMember = project?.members?.find(m=>m.userId===uid);
  const isOwner = project?.ownerId === uid || role === "admin";
  const canPost = isOwner || myMember?.permission === "editor" || myMember?.permission === "contributor";
  const pct = Math.round((ip.fundingRaised / ip.fundingTarget) * 100);

  const baseTabs = [
    {id:"overview",label:"Overview",icon:"◈"},
    {id:"tech",label:"Technology",icon:"⚗"},
    {id:"milestones",label:"Chronicle",icon:"📜"},
    {id:"team",label:"Team",icon:"👥"},
    {id:"docs",label:"Docs",icon:"📄",count:ip.docs.length},
  ];
  const projectTabs = project ? [
    {id:"proj-chronicle",label:"Project Chronicle",icon:"📜",count:chronicle.length,badge:"Live"},
    {id:"proj-discuss",label:"Discussion",icon:"💬",count:discussions.length},
  ] : [];

  return (
    <div>
      <BackBtn onClick={()=>setPage("innovations")} label="← Innovation Marketplace" />
      <div style={{marginBottom:18}}>
        <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap",alignItems:"center"}}>
          <Badge text={ip.field} color={CAT_COLORS[ip.field]||"#2563EB"} />
          <TRLBadge level={ip.trl} showLabel />
          <StatusBadge status={project?"active":ip.status} />
          <Badge text={ip.assetType} color="#7C3AED" />
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
          <h1 style={{fontSize:26,fontWeight:900,color:"#1E293B",margin:0,fontFamily:"'Syne',sans-serif",lineHeight:1.2,flex:1}}>{ip.title}</h1>
          <KokoBtn type="innovations" item={ip} size="md" />
        </div>
        <p style={{fontSize:13,color:"#64748B",margin:"0 0 10px",fontFamily:"'DM Sans',sans-serif"}}>By {ip.innovator} · {ip.legalRef}</p>
        <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{ip.tags.map((t,i) => <Tag key={i} text={t} color={CAT_COLORS[ip.field]||"#2563EB"} />)}</div>
      </div>

      {project && (
        <div onClick={()=>setTab("proj-chronicle")} style={{background:"linear-gradient(135deg,#1E3A8A,#2563EB)",borderRadius:14,padding:"14px 20px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <div style={{width:38,height:38,borderRadius:10,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>🤝</div>
            <div>
              <div style={{fontSize:10,fontWeight:800,color:"#7DD3FC",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:3,fontFamily:"'DM Sans',sans-serif"}}>Active Project</div>
              <div style={{fontSize:14,fontWeight:700,color:"#fff",fontFamily:"'Syne',sans-serif"}}>{project.title}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.65)",fontFamily:"'DM Sans',sans-serif"}}>{project.ownerName} · {project.progress}% complete</div>
            </div>
          </div>
          <AvatarStack members={project.members} />
        </div>
      )}

      <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:20}}>
        <div>
          <div style={{marginBottom:20}}><Tabs tabs={[...baseTabs,...projectTabs]} active={tab} onChange={setTab} /></div>

          {tab === "overview" && (
            <Card style={{padding:24}} hover={false}>
              <SectionTitle title="Abstract" />
              <p style={{fontSize:13,color:"#64748B",lineHeight:1.85,fontFamily:"'DM Sans',sans-serif",marginBottom:16}}>{ip.overview}</p>
              <SectionTitle title="📜 Chronicle — Milestones" />
              {ip.timeline.map((ms,i) => <MilestoneCard key={ms.id} ms={ms} isLast={i===ip.timeline.length-1} isOwner={isOwner} onComplete={()=>addNotif({type:"update",text:`Milestone "${ms.title}" marked complete.`})} />)}
            </Card>
          )}

          {tab === "tech" && (
            <Card style={{padding:24}} hover={false}>
              <SectionTitle title="Technology Details" />
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:18}}>
                {[{l:"Asset Type",v:ip.assetType},{l:"Legal Ref",v:ip.legalRef},{l:"Stage",v:ip.stage},{l:"Field",v:ip.field},{l:"Views",v:ip.views?.toLocaleString()},{l:"Interests",v:ip.interests}].map((s,i) => (
                  <div key={i} style={{background:"#F8FAFC",borderRadius:10,padding:"11px 14px",border:"1px solid #F1F5F9"}}>
                    <div style={{fontSize:9,color:"#94A3B8",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:3,fontFamily:"'DM Sans',sans-serif"}}>{s.l}</div>
                    <div style={{fontSize:13,fontWeight:700,color:"#1E293B",fontFamily:"'Syne',sans-serif"}}>{s.v}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === "milestones" && (
            <Card style={{padding:24}} hover={false}>
              <SectionTitle title="📜 Chronicle — Milestone Roadmap" sub={`${ip.timeline.filter(m=>m.done).length} / ${ip.timeline.length} complete`} />
              <ProgressBar value={(ip.timeline.filter(m=>m.done).length/ip.timeline.length)*100} color="#2563EB" h={8} />
              <div style={{marginTop:20}}>
                {ip.timeline.map((ms,i) => <MilestoneCard key={ms.id} ms={ms} isLast={i===ip.timeline.length-1} isOwner={isOwner} onComplete={()=>addNotif({type:"update",text:"Milestone done."})} />)}
              </div>
            </Card>
          )}

          {tab === "team" && (
            <Card style={{padding:24}} hover={false}>
              <SectionTitle title="Research Team" />
              {ip.authors.map((a,i) => (
                <div key={i} style={{display:"flex",gap:12,alignItems:"center",padding:"13px 0",borderBottom:i<ip.authors.length-1?"1px solid #F1F5F9":"none"}}>
                  <Avatar name={a.name} size={40} color={CAT_COLORS[ip.field]||"#2563EB"} />
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:700,color:"#1E293B",fontFamily:"'Syne',sans-serif"}}>{a.name}</div>
                    <div style={{fontSize:11,color:"#64748B",fontFamily:"'DM Sans',sans-serif"}}>{a.role} · {a.org}</div>
                  </div>
                </div>
              ))}
            </Card>
          )}

          {tab === "docs" && (
            <Card style={{padding:24}} hover={false}>
              <SectionTitle title="Documents" />
              {ip.docs.map((d,i) => (
                <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:i<ip.docs.length-1?"1px solid #F1F5F9":"none"}}>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    <div style={{width:36,height:36,borderRadius:9,background:d.confidential?"#FFF7ED":"#F0FDF4",border:`1px solid ${d.confidential?"#FDE68A":"#A7F3D0"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{d.confidential?"🔒":"📄"}</div>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:"#1E293B",fontFamily:"'DM Sans',sans-serif"}}>{d.name}</div>
                      <div style={{fontSize:10,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>{d.type?.toUpperCase()} · {d.size}</div>
                    </div>
                  </div>
                  {d.confidential
                    ? (ndaOk ? <Btn size="sm" color="#2563EB">↓ Download</Btn> : <Btn size="sm" color="#7C3AED" onClick={()=>setNdaOpen(true)}>Request Access</Btn>)
                    : <Btn size="sm" color="#10B981">↓ Download</Btn>}
                </div>
              ))}
            </Card>
          )}

          {tab === "proj-chronicle" && project && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div>
                  <h2 style={{fontSize:16,fontWeight:800,color:"#1E293B",margin:0,fontFamily:"'Syne',sans-serif"}}>📜 Project Chronicle</h2>
                  <p style={{fontSize:11,color:"#94A3B8",margin:"2px 0 0",fontFamily:"'DM Sans',sans-serif"}}>Project progress updates</p>
                </div>
                {canPost && <Btn color="#2563EB" onClick={()=>setChronicleOpen(true)} icon="📜">Add Chronicle Entry</Btn>}
              </div>
              {chronicle.length === 0 && <Card style={{padding:40,textAlign:"center"}} hover={false}><div style={{fontSize:36,marginBottom:10}}>📜</div><div style={{fontSize:13,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>No chronicle entries yet.</div></Card>}
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {chronicle.map(e => <ChronicleEntry key={e.id} entry={e} canEdit={canPost} onDelete={id=>setChronicle(p=>p.filter(x=>x.id!==id))} />)}
              </div>
            </div>
          )}

          {tab === "proj-discuss" && project && (
            <Card style={{padding:22}} hover={false}>
              <SectionTitle title="Project Discussion" />
              <div style={{background:"#F8FAFC",borderRadius:12,padding:14,marginBottom:14,maxHeight:340,overflow:"auto",display:"flex",flexDirection:"column",gap:10,border:"1px solid #E8EDFB"}}>
                {discussions.map((m,i) => (
                  <div key={i} style={{background:"#fff",borderRadius:10,padding:"12px 14px",border:"1px solid #F1F5F9"}}>
                    <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:5}}>
                      <Avatar name={m.from} size={26} color={m.color||"#2563EB"} />
                      <span style={{fontSize:11,fontWeight:700,color:m.color||"#2563EB",fontFamily:"'DM Sans',sans-serif"}}>{m.from}</span>
                      <span style={{fontSize:10,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>· {m.time}</span>
                    </div>
                    <div style={{fontSize:13,color:"#374151",lineHeight:1.6,fontFamily:"'DM Sans',sans-serif"}}>{m.text}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:10}}>
                <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)}
                  onKeyDown={e=>{if(e.key==="Enter"&&chatMsg.trim()){setDiscussions(p=>[...p,{id:"d"+Date.now(),from:"You",text:chatMsg,time:"Just now",color:"#2563EB"}]);setChatMsg("");}}}
                  placeholder="Type a message… (Enter to send)"
                  style={{flex:1,padding:"10px 14px",border:"1.5px solid #E2E8F0",borderRadius:10,fontSize:13,outline:"none",fontFamily:"'DM Sans',sans-serif"}} />
                <Btn color="#2563EB" onClick={()=>{if(chatMsg.trim()){setDiscussions(p=>[...p,{id:"d"+Date.now(),from:"You",text:chatMsg,time:"Just now",color:"#2563EB"}]);setChatMsg("");}}}>Send</Btn>
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <Card style={{padding:20,marginBottom:12}} hover={false}>
            <div style={{fontSize:22,fontWeight:900,color:"#7C3AED",fontFamily:"'Syne',sans-serif",marginBottom:3}}>${(ip.fundingRaised/1000).toFixed(0)}K <span style={{fontSize:13,color:"#94A3B8",fontWeight:400}}>raised</span></div>
            <div style={{fontSize:11,color:"#94A3B8",marginBottom:6,fontFamily:"'DM Sans',sans-serif"}}>of ${(ip.fundingTarget/1000).toFixed(0)}K target</div>
            <ProgressBar value={pct} color="#7C3AED" h={8} />
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12}}>
              <div style={{background:"#EFF6FF",borderRadius:9,padding:11,textAlign:"center"}}><div style={{fontSize:18,fontWeight:900,color:"#2563EB",fontFamily:"'Syne',sans-serif"}}>{ip.interests}</div><div style={{fontSize:10,color:"#64748B",fontFamily:"'DM Sans',sans-serif"}}>Investors</div></div>
              <div style={{background:"#F0FDF4",borderRadius:9,padding:11,textAlign:"center"}}><div style={{fontSize:18,fontWeight:900,color:"#10B981",fontFamily:"'Syne',sans-serif"}}>{ip.views?.toLocaleString()}</div><div style={{fontSize:10,color:"#64748B",fontFamily:"'DM Sans',sans-serif"}}>Views</div></div>
            </div>
          </Card>
          <Card style={{padding:20,marginBottom:12}} hover={false}>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <Btn full color="#2563EB" onClick={()=>setNdaOpen(true)} icon="📋">Request Documents</Btn>
              {interested
                ? <div style={{background:"#F0FDF4",border:"1px solid #A7F3D0",borderRadius:9,padding:"9px 13px",fontSize:11,color:"#059669",fontFamily:"'DM Sans',sans-serif"}}>✅ Interest registered!</div>
                : <Btn full color="#7C3AED" variant="outline" onClick={()=>{setInterested(true);addNotif({type:"investment",text:`Interest expressed in "${ip.title}".`});}} icon="💰">Express Interest</Btn>}
              <Btn full color="#0891B2" variant="outline" onClick={()=>setContactOpen(true)} icon="✉️">Contact Team</Btn>
            </div>
          </Card>
        </div>
      </div>

      <Modal open={ndaOpen} onClose={()=>setNdaOpen(false)} title="NDA Agreement">
        <p style={{fontSize:12,color:"#64748B",lineHeight:1.8,marginBottom:14,fontFamily:"'DM Sans',sans-serif"}}>By accepting, all documents shared are strictly confidential.</p>
        {ndaOk
          ? <Badge text="✅ NDA accepted" color="#10B981" />
          : <div style={{display:"flex",gap:8}}><Btn full color="#2563EB" onClick={()=>{setNdaOk(true);setNdaOpen(false);}}>I Accept</Btn><Btn full color="#EF4444" variant="outline" onClick={()=>setNdaOpen(false)}>Decline</Btn></div>}
      </Modal>
      <Modal open={contactOpen} onClose={()=>setContactOpen(false)} title={`Contact ${ip.innovator}`}>
        <Input label="Message" value={msgText} onChange={setMsgText} rows={5} placeholder="Introduce yourself…" />
        <Btn full color="#2563EB" onClick={()=>{setContactOpen(false);addNotif({type:"solution",text:`Message sent to ${ip.innovator}.`});}}>Send Message →</Btn>
      </Modal>
      <Modal open={chronicleOpen} onClose={()=>setChronicleOpen(false)} title="Add Chronicle Entry">
        <Sel label="Type" value={chronicleForm.type} onChange={v=>setChronicleForm(f=>({...f,type:v}))} options={["update","research","funding","milestone","announcement"]} />
        <Input label="Title" value={chronicleForm.title} onChange={v=>setChronicleForm(f=>({...f,title:v}))} placeholder="Entry title" required />
        <Input label="Content" value={chronicleForm.body} onChange={v=>setChronicleForm(f=>({...f,body:v}))} rows={5} placeholder="Describe the update…" required />
        <div style={{display:"flex",gap:8}}>
          <Btn full color="#2563EB" onClick={()=>{if(chronicleForm.title){const rc=ROLE_CFG[role];setChronicle(p=>[{id:"ch"+Date.now(),author:USERS.find(u=>u.role===role)?.name||"You",authorColor:rc.color,date:new Date().toISOString().split("T")[0],...chronicleForm,tags:[],attachments:[]}, ...p]);setChronicleOpen(false);}}} >Post</Btn>
          <Btn full color="#EF4444" variant="outline" onClick={()=>setChronicleOpen(false)}>Cancel</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════
//  OTHER PAGES
// ═══════════════════════════════════════════════
const InnovationMarketplace = ({ setPage }) => {
  const [search, setSearch] = useState("");
  const [field, setField] = useState("All");
  const filtered = IP_DATA.filter(i =>
    i.status !== "draft" &&
    (field === "All" || i.field === field) &&
    (!search || i.title.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div>
      <PageHeader title="Innovation Marketplace" sub={`${IP_DATA.filter(i=>i.status!=="draft").length} IPs`} />
      <Card style={{padding:18,marginBottom:18}} hover={false}>
        <div style={{display:"flex",gap:10}}>
          <div style={{flex:2}}><Input label="" value={search} onChange={setSearch} placeholder="🔍  Search IPs…" /></div>
          <div style={{flex:1}}><Sel label="Field" value={field} onChange={setField} options={["All",...FIELDS_LIST]} /></div>
        </div>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
        {filtered.map(ip => (
          <Card key={ip.id} onClick={()=>setPage("ip-"+ip.id)} style={{padding:20,cursor:"pointer"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <Badge text={ip.field} color={CAT_COLORS[ip.field]||"#2563EB"} />
              <div style={{display:"flex",gap:6,alignItems:"center"}}><TRLBadge level={ip.trl} /><KokoBtn type="innovations" item={ip} size="sm" /></div>
            </div>
            <h3 style={{fontSize:13,fontWeight:700,color:"#1E293B",margin:"0 0 5px",lineHeight:1.4,fontFamily:"'Syne',sans-serif"}}>{ip.title}</h3>
            <p style={{fontSize:11,color:"#64748B",lineHeight:1.6,margin:"0 0 10px",fontFamily:"'DM Sans',sans-serif"}}>{ip.desc}</p>
            <TRLMeter level={ip.trl} />
            <div style={{height:1,background:"#F1F5F9",margin:"10px 0"}} />
            <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>{ip.tags.slice(0,3).map((t,i) => <Tag key={i} text={t} />)}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:10,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>{ip.innovator}</span>
              <StatusBadge status={PROJECTS.find(p=>p.ipId===ip.id)?"active":ip.status} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ChallengeMarketplace = ({ setPage, addNotif }) => {
  const [submitted, setSubmitted] = useState({});
  const [subOpen, setSubOpen] = useState(null);
  const [subForm, setSubForm] = useState({title:"",desc:""});
  return (
    <div>
      <PageHeader title="Challenge Marketplace" sub="Industry problems seeking solutions." />
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {CHALLENGES.map(ch => (
          <Card key={ch.id} style={{padding:22}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:7,marginBottom:8,flexWrap:"wrap",alignItems:"center"}}>
                  <Badge text={ch.industry} color={CAT_COLORS[ch.industry]||"#D97706"} />
                  {ch.urgent && <Badge text="URGENT" color="#EF4444" />}
                  <Badge text="OPEN" color="#10B981" />
                </div>
                <h3 style={{fontSize:15,fontWeight:700,color:"#1E293B",margin:"0 0 5px",fontFamily:"'Syne',sans-serif"}}>{ch.title}</h3>
                <p style={{fontSize:12,color:"#64748B",lineHeight:1.6,margin:"0 0 10px",fontFamily:"'DM Sans',sans-serif"}}>{ch.desc.slice(0,140)}…</p>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{ch.tags.map((t,i) => <Tag key={i} text={t} />)}</div>
              </div>
              <div style={{textAlign:"right",marginLeft:20,flexShrink:0}}>
                <div style={{display:"flex",justifyContent:"flex-end",marginBottom:6}}><KokoBtn type="challenges" item={ch} size="sm" /></div>
                <div style={{fontSize:24,fontWeight:900,color:"#D97706",fontFamily:"'Syne',sans-serif"}}>{ch.reward}</div>
                <div style={{fontSize:11,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>📅 {ch.deadline}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:8,marginTop:14}}>
              {submitted[ch.id]
                ? <Badge text="✅ Submitted" color="#10B981" />
                : <Btn color="#D97706" onClick={()=>setSubOpen(ch)}>Submit Solution →</Btn>}
            </div>
          </Card>
        ))}
      </div>
      <Modal open={!!subOpen} onClose={()=>setSubOpen(null)} title={`Submit to: ${subOpen?.title}`} wide>
        <Input label="Solution Title" value={subForm.title} onChange={v=>setSubForm({...subForm,title:v})} required />
        <Input label="Description" value={subForm.desc} onChange={v=>setSubForm({...subForm,desc:v})} rows={5} required />
        <div style={{display:"flex",gap:8}}>
          <Btn full color="#D97706" onClick={()=>{if(subForm.title){setSubmitted(p=>({...p,[subOpen.id]:true}));setSubOpen(null);addNotif({type:"solution",text:`Solution submitted to "${subOpen.title}".`});}}}>Submit →</Btn>
          <Btn full color="#EF4444" variant="outline" onClick={()=>setSubOpen(null)}>Cancel</Btn>
        </div>
      </Modal>
    </div>
  );
};

const FundingPage = ({ setPage }) => {
  const [interests, setInterests] = useState({});
  const seeking = IP_DATA.filter(i=>i.status==="published"&&i.fundingRaised<i.fundingTarget);
  return (
    <div>
      <PageHeader title="Funding Opportunities" sub="IPs seeking investment." />
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {seeking.map(ip => {
          const pct = Math.round((ip.fundingRaised/ip.fundingTarget)*100);
          return (
            <Card key={ip.id} style={{padding:22}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div style={{display:"flex",gap:7,flexWrap:"wrap"}}><Badge text={ip.field} color={CAT_COLORS[ip.field]||"#7C3AED"} /><TRLBadge level={ip.trl} /></div>
                <KokoBtn type="innovations" item={ip} size="sm" />
              </div>
              <h3 style={{fontSize:14,fontWeight:700,color:"#1E293B",margin:"0 0 7px",fontFamily:"'Syne',sans-serif"}}>{ip.title}</h3>
              <div style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:12,fontWeight:700,color:"#1E293B",fontFamily:"'DM Sans',sans-serif"}}>${(ip.fundingRaised/1000).toFixed(0)}K raised</span>
                  <span style={{fontSize:11,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>{pct}%</span>
                </div>
                <ProgressBar value={pct} color="#7C3AED" h={7} />
              </div>
              <div style={{display:"flex",gap:7}}>
                <Btn color="#2563EB" size="sm" onClick={()=>setPage("ip-"+ip.id)}>View IP</Btn>
                {interests[ip.id] ? <Badge text="✓ Interested" color="#10B981" /> : <Btn color="#7C3AED" size="sm" variant="outline" onClick={()=>setInterests(p=>({...p,[ip.id]:true}))}>Express Interest</Btn>}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const MyInnovationsPage = ({ setPage }) => (
  <div>
    <PageHeader title="My Innovations" action={()=>setPage("create-ip")} actionLabel="+ Create IP" actionColor="#2563EB" actionIcon="+" />
    {IP_DATA.filter(i=>i.innovatorId==="u1").map(ip => (
      <Card key={ip.id} style={{padding:20,marginBottom:12}} hover={false}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div style={{flex:1}}>
            <div style={{display:"flex",gap:7,marginBottom:8,flexWrap:"wrap"}}>
              <Badge text={ip.field} color={CAT_COLORS[ip.field]||"#2563EB"} />
              <TRLBadge level={ip.trl} />
              <StatusBadge status={PROJECTS.find(p=>p.ipId===ip.id)?"active":ip.status} />
            </div>
            <h3 style={{fontSize:15,fontWeight:700,color:"#1E293B",margin:"0 0 4px",fontFamily:"'Syne',sans-serif"}}>{ip.title}</h3>
            <p style={{fontSize:12,color:"#64748B",margin:"0 0 8px",fontFamily:"'DM Sans',sans-serif"}}>{ip.desc}</p>
          </div>
          <Btn size="sm" color="#2563EB" onClick={()=>setPage("ip-"+ip.id)}>View</Btn>
        </div>
      </Card>
    ))}
  </div>
);

const CreateIPPage = ({ setPage, addNotif }) => {
  const [title, setTitle] = useState("");
  const [field, setField] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <div style={{maxWidth:560,margin:"0 auto"}}>
      <BackBtn onClick={()=>setPage("my-innovations")} />
      <PageHeader title="Create New IP" />
      <Card style={{padding:28}} hover={false}>
        <Input label="IP Title" value={title} onChange={setTitle} placeholder="e.g. AI-Powered Rice Disease Detection" required />
        <Sel label="Field" value={field} onChange={setField} options={FIELDS_LIST} required />
        <Input label="Short Description" value={desc} onChange={setDesc} rows={3} placeholder="Describe your innovation…" />
        <Btn full color="#2563EB" onClick={()=>{if(title&&field){addNotif({type:"approval",text:`"${title}" submitted for review.`});setPage("my-innovations");}}}>Submit IP →</Btn>
      </Card>
    </div>
  );
};

const MyProjectsPage = ({ setPage, role }) => {
  const uid = {innovator:"u1",seeker:"u2",investor:"u3",admin:"u4"}[role];
  const mine = PROJECTS.filter(p=>p.members.some(m=>m.userId===uid));
  return (
    <div>
      <PageHeader title="My Projects" sub={`${mine.length} active projects`} />
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {mine.map(p => (
          <Card key={p.id} style={{padding:24}} hover={false}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:7,marginBottom:8,flexWrap:"wrap",alignItems:"center"}}>
                  <Badge text="Active" color="#2563EB" />
                  <Badge text={p.stage} color="#7C3AED" />
                  <KokoBtn type="projects" item={p} size="sm" />
                </div>
                <h3 style={{fontSize:17,fontWeight:800,color:"#1E293B",margin:"0 0 3px",fontFamily:"'Syne',sans-serif"}}>{p.title}</h3>
                <div style={{fontSize:12,color:"#94A3B8",marginBottom:8,fontFamily:"'DM Sans',sans-serif"}}>Owner: {p.ownerName}</div>
                <p style={{fontSize:12,color:"#64748B",lineHeight:1.5,margin:"0 0 12px",fontFamily:"'DM Sans',sans-serif"}}>{p.desc}</p>
                <AvatarStack members={p.members} />
              </div>
              <div style={{textAlign:"right",marginLeft:20}}>
                <div style={{fontSize:28,fontWeight:900,color:"#2563EB",fontFamily:"'Syne',sans-serif"}}>{p.progress}%</div>
              </div>
            </div>
            <ProgressBar value={p.progress} color="#2563EB" h={8} />
            <div style={{marginTop:14}}><Btn color="#2563EB" onClick={()=>setPage("ip-"+p.ipId)}>Open Workspace →</Btn></div>
          </Card>
        ))}
      </div>
    </div>
  );
};

const RecruitmentPage = ({ setPage, addNotif }) => {
  const ROLES = [
    {id:"role1",projectTitle:"AI Crop × Steel Corp Joint R&D",ipId:"i1",role:"ML / Edge AI Engineer",field:"AgriTech",skills:["TensorFlow Lite","PyTorch","C++"],commitment:"Full-time · 6 months",desc:"Lead optimization of the inference engine for embedded hardware.",applicants:2},
    {id:"role2",projectTitle:"Blockchain Pharma Traceability",ipId:"i2",role:"Smart Contract Developer",field:"FinTech",skills:["Solidity","Hyperledger Fabric","Go"],commitment:"Full-time · 4 months",desc:"Extend smart contract system for multi-product-line deployment.",applicants:1},
  ];
  const [applied, setApplied] = useState({});
  const [applyOpen, setApplyOpen] = useState(null);
  const [applyForm, setApplyForm] = useState({skills:"",msg:""});
  return (
    <div>
      <PageHeader title="Team Recruitment" sub={`${ROLES.length} open roles`} />
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {ROLES.map(r => (
          <Card key={r.id} style={{padding:22}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div style={{flex:1}}>
                <Badge text={r.field} color={CAT_COLORS[r.field]||"#7C3AED"} />
                <h3 style={{fontSize:14,fontWeight:800,color:"#1E293B",margin:"6px 0 3px",fontFamily:"'Syne',sans-serif"}}>{r.role}</h3>
                <div style={{fontSize:11,color:"#2563EB",marginBottom:4,fontFamily:"'DM Sans',sans-serif"}}>{r.projectTitle}</div>
              </div>
              <KokoBtn type="roles" item={r} size="sm" />
            </div>
            <p style={{fontSize:12,color:"#64748B",lineHeight:1.6,margin:"0 0 10px",fontFamily:"'DM Sans',sans-serif"}}>{r.desc}</p>
            <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>{r.skills.map((s,i) => <Tag key={i} text={s} color="#7C3AED" />)}</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:10,borderTop:"1px solid #F1F5F9"}}>
              <span style={{fontSize:10,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>{r.commitment}</span>
              {applied[r.id] ? <Badge text="✅ Applied" color="#10B981" sm /> : <Btn size="sm" color="#D97706" onClick={()=>setApplyOpen(r.id)}>Apply →</Btn>}
            </div>
          </Card>
        ))}
      </div>
      <Modal open={!!applyOpen} onClose={()=>setApplyOpen(null)} title="Apply for Role">
        <Input label="Your Key Skills" value={applyForm.skills} onChange={v=>setApplyForm(f=>({...f,skills:v}))} placeholder="e.g. TensorFlow, C++" required />
        <Input label="Message" value={applyForm.msg} onChange={v=>setApplyForm(f=>({...f,msg:v}))} rows={3} placeholder="Why are you a great fit?" required />
        <div style={{display:"flex",gap:8}}>
          <Btn full color="#D97706" onClick={()=>{if(applyForm.msg){setApplied(p=>({...p,[applyOpen]:true}));setApplyOpen(null);addNotif({type:"recruit",text:"Application submitted!"});}}}>Submit →</Btn>
          <Btn full color="#EF4444" variant="outline" onClick={()=>setApplyOpen(null)}>Cancel</Btn>
        </div>
      </Modal>
    </div>
  );
};

// ═══════════════════════════════════════════════
//  DASHBOARDS
// ═══════════════════════════════════════════════
const InnovatorDashboard = ({ setPage, addNotif, argonautsList }) => {
  const myIPs = IP_DATA.filter(i=>i.innovatorId==="u1");
  const myProj = PROJECTS.filter(p=>p.members.some(m=>m.userId==="u1"));
  const invitedArgs = argonautsList.filter(a=>a.candidates.some(c=>c.userId==="u1"&&c.type==="invited"&&c.status==="pending"));
  const recArgs = argonautsList.filter(a=>a.status==="open").slice(0,2);
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
        <div>
          <div style={{fontSize:11,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif",marginBottom:3}}>👋 Welcome back,</div>
          <h1 style={{fontSize:24,fontWeight:900,color:"#1E293B",margin:0,fontFamily:"'Syne',sans-serif"}}>Dr. Nguyen Thi Lan</h1>
          <div style={{fontSize:12,color:"#64748B",fontFamily:"'DM Sans',sans-serif"}}>FIT Lab – UIT · Innovator</div>
        </div>
        <Btn color="#2563EB" size="lg" onClick={()=>setPage("create-ip")} icon="+">Create IP</Btn>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:22}}>
        <StatCard label="My IPs" value={myIPs.length} icon="◈" color="#2563EB" onClick={()=>setPage("my-innovations")} />
        <StatCard label="Projects" value={myProj.length} icon="🤝" color="#7C3AED" onClick={()=>setPage("my-projects")} />
        <StatCard label="Argonauts" value={argonautsList.length} icon="⚔" color="#D97706" onClick={()=>setPage("argonauts")} />
        <StatCard label="Invitations" value={invitedArgs.length} icon="📨" color="#EF4444" />
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:18}}>
        <div>
          {invitedArgs.length > 0 && (
            <Card style={{padding:20,marginBottom:14,border:"2px solid #FDE68A",background:"#FFFBEB"}} hover={false}>
              <SectionTitle title="⚔ Argonauts Invitations" sub="You have been invited to join grand challenge missions" />
              {invitedArgs.map((a,i) => (
                <div key={a.id} style={{display:"flex",gap:12,alignItems:"center",padding:"12px 0",borderBottom:i<invitedArgs.length-1?"1px solid #FDE68A":"none"}}>
                  <div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#0F172A,#1E3A8A)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>⚔</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#1E293B",fontFamily:"'Syne',sans-serif"}}>{a.title}</div>
                    <div style={{fontSize:11,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>{a.org} · {a.fundingCommitment}</div>
                  </div>
                  <div style={{display:"flex",gap:6}}>
                    <Btn size="sm" variant="success" onClick={()=>addNotif({type:"accepted",text:`You accepted the Argonauts invitation for "${a.title}".`})}>Accept</Btn>
                    <Btn size="sm" variant="danger" onClick={()=>{}}>Decline</Btn>
                  </div>
                </div>
              ))}
            </Card>
          )}
          <Card style={{padding:20,marginBottom:14}} hover={false}>
            <SectionTitle title="My Innovations" action={()=>setPage("my-innovations")} actionLabel="Manage →" />
            {myIPs.map((ip,i) => (
              <div key={ip.id} style={{display:"flex",gap:12,alignItems:"center",padding:"10px 0",borderBottom:i<myIPs.length-1?"1px solid #F1F5F9":"none",cursor:"pointer"}} onClick={()=>setPage("ip-"+ip.id)}>
                <div style={{width:7,height:7,borderRadius:"50%",background:PROJECTS.find(p=>p.ipId===ip.id)?"#2563EB":ip.status==="published"?"#10B981":"#F59E0B",flexShrink:0}} />
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#1E293B",fontFamily:"'DM Sans',sans-serif"}}>{ip.title}</div>
                  <div style={{display:"flex",gap:5,marginTop:3}}><TRLBadge level={ip.trl} /><Badge text={ip.field} color={CAT_COLORS[ip.field]||"#2563EB"} sm /></div>
                </div>
                <StatusBadge status={PROJECTS.find(p=>p.ipId===ip.id)?"active":ip.status} />
              </div>
            ))}
          </Card>
          <KokoWidget setPage={setPage} />
        </div>
        <div>
          <Card style={{padding:20,marginBottom:14}} hover={false}>
            <SectionTitle title="⚔ Recommended Argonauts" sub="Missions matching your expertise" action={()=>setPage("argonauts")} actionLabel="See All →" />
            {recArgs.map((a,i) => (
              <div key={a.id} style={{background:"linear-gradient(135deg,#0F172A,#1E3A8A)",borderRadius:12,padding:"13px 15px",marginBottom:8,cursor:"pointer"}} onClick={()=>setPage("arg-"+a.id)}>
                <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.65)",fontFamily:"'DM Sans',sans-serif",marginBottom:4}}>{a.org} · {a.fundingCommitment}</div>
                <div style={{fontSize:13,fontWeight:700,color:"#fff",fontFamily:"'Syne',sans-serif",lineHeight:1.3,marginBottom:5}}>{a.title}</div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{a.disciplines.slice(0,2).map((d,j) => <Tag key={j} text={d} color="#A78BFA" />)}</div>
              </div>
            ))}
          </Card>
          <Card style={{padding:20}} hover={false}>
            <SectionTitle title="AI Matches" />
            {[
              {type:"Challenge Match",c:"#D97706",icon:"◎",title:"Flood Warning – 88% match",sub:"MONRE · $25K",fn:()=>setPage("challenges")},
              {type:"Argonauts Invite",c:"#7C3AED",icon:"⚔",title:"Net-Zero Smart City Mission",sub:"Ministry of Construction",fn:()=>setPage("argonauts")},
            ].map((m,i) => (
              <div key={i} style={{background:`${m.c}08`,border:`1px solid ${m.c}20`,borderRadius:10,padding:"10px 13px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                <div style={{display:"flex",gap:9,alignItems:"flex-start",flex:1}}>
                  <div style={{width:28,height:28,borderRadius:7,background:`${m.c}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>{m.icon}</div>
                  <div><Badge text={m.type} color={m.c} sm /><div style={{fontSize:12,fontWeight:600,color:"#1E293B",marginTop:2,fontFamily:"'DM Sans',sans-serif"}}>{m.title}</div><div style={{fontSize:10,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>{m.sub}</div></div>
                </div>
                <Btn size="sm" color={m.c} onClick={m.fn}>View</Btn>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

const SeekerDashboard = ({ setPage, addNotif, argonautsList }) => {
  const myArgs = argonautsList.filter(a=>a.createdBy==="u2");
  const myProj = PROJECTS.filter(p=>p.members.some(m=>m.userId==="u2"));
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
        <div>
          <div style={{fontSize:11,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif",marginBottom:3}}>👋 Welcome back,</div>
          <h1 style={{fontSize:24,fontWeight:900,color:"#1E293B",margin:0,fontFamily:"'Syne',sans-serif"}}>Viet Nam Steel Corp</h1>
        </div>
        <div style={{display:"flex",gap:8}}>
          <Btn color="#7C3AED" size="md" onClick={()=>setPage("post-argonauts")} icon="⚔">Post Argonauts</Btn>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:22}}>
        <StatCard label="Argonauts" value={myArgs.length} icon="⚔" color="#7C3AED" onClick={()=>setPage("argonauts")} />
        <StatCard label="Challenges" value={2} icon="◎" color="#D97706" />
        <StatCard label="Projects" value={myProj.length} icon="🤝" color="#2563EB" onClick={()=>setPage("my-projects")} />
        <StatCard label="Applications" value={myArgs.reduce((s,a)=>s+a.candidates.length,0)} icon="👤" color="#10B981" />
      </div>
      <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:18}}>
        <div>
          <Card style={{padding:20,marginBottom:14}} hover={false}>
            <SectionTitle title="⚔ My Argonauts Missions" action={()=>setPage("argonauts")} actionLabel="View All →" />
            {myArgs.length === 0 && <div style={{textAlign:"center",padding:24}}><Btn color="#7C3AED" onClick={()=>setPage("post-argonauts")} icon="⚔">Post Argonauts Mission</Btn></div>}
            {myArgs.map((a,i) => (
              <div key={a.id} style={{background:"linear-gradient(135deg,#0F172A,#1E3A8A)",borderRadius:12,padding:"14px 16px",marginBottom:10,cursor:"pointer"}} onClick={()=>setPage("arg-"+a.id)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:700,color:"#fff",fontFamily:"'Syne',sans-serif",flex:1,lineHeight:1.3}}>{a.title}</div>
                  <Badge text={ARGONAUTS_STATUS[a.status]?.label||a.status} color={ARGONAUTS_STATUS[a.status]?.color||"#94A3B8"} />
                </div>
                <div style={{display:"flex",gap:12}}>
                  <span style={{fontSize:11,color:"rgba(255,255,255,0.65)",fontFamily:"'DM Sans',sans-serif"}}>👤 {a.candidates.length} applicants</span>
                  <span style={{fontSize:11,color:"rgba(255,255,255,0.65)",fontFamily:"'DM Sans',sans-serif"}}>✅ {a.candidates.filter(c=>c.status==="approved").length} approved</span>
                </div>
              </div>
            ))}
          </Card>
          <KokoWidget setPage={setPage} />
        </div>
        <Card style={{padding:20}} hover={false}>
          <SectionTitle title="Team Formation Progress" />
          {myArgs.map(a => {
            const approved = a.candidates.filter(c=>c.status==="approved").length;
            const pct = Math.round((new Set(a.candidates.filter(c=>c.status==="approved").map(c=>c.discipline)).size/Math.max(1,a.disciplines.length))*100);
            return (
              <div key={a.id} style={{marginBottom:14,padding:"12px 14px",background:"#F8FAFC",borderRadius:10,border:"1px solid #E8EDFB"}}>
                <div style={{fontSize:12,fontWeight:700,color:"#1E293B",fontFamily:"'Syne',sans-serif",marginBottom:6}}>{a.title.slice(0,35)}…</div>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                  <span style={{fontSize:11,color:"#64748B",fontFamily:"'DM Sans',sans-serif"}}>Coverage</span>
                  <span style={{fontSize:11,fontWeight:700,color:"#7C3AED"}}>{pct}%</span>
                </div>
                <ProgressBar value={pct} color="#7C3AED" h={5} />
                <div style={{fontSize:10,color:"#94A3B8",marginTop:5,fontFamily:"'DM Sans',sans-serif"}}>{approved} of {a.teamSize} members</div>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
};

const InvestorDashboard = ({ setPage, argonautsList }) => (
  <div>
    <div style={{marginBottom:22}}>
      <div style={{fontSize:11,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif",marginBottom:3}}>👋 Welcome back,</div>
      <h1 style={{fontSize:24,fontWeight:900,color:"#1E293B",margin:0,fontFamily:"'Syne',sans-serif"}}>Do Ventures</h1>
      <div style={{fontSize:12,color:"#64748B",fontFamily:"'DM Sans',sans-serif"}}>DeepTech & HealthTech VC</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:22}}>
      <StatCard label="Portfolio" value="28" icon="◆" color="#10B981" />
      <StatCard label="Tracked IPs" value="12" icon="◈" color="#2563EB" onClick={()=>setPage("innovations")} />
      <StatCard label="Argonauts" value={argonautsList.length} icon="⚔" color="#7C3AED" onClick={()=>setPage("argonauts")} />
      <StatCard label="Deployed" value="$4.2M" icon="💰" color="#D97706" />
    </div>
    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:18}}>
      <div>
        <Card style={{padding:20,marginBottom:14}} hover={false}>
          <SectionTitle title="Featured Argonauts" action={()=>setPage("argonauts")} actionLabel="View All →" />
          {argonautsList.slice(0,2).map((a,i) => (
            <div key={a.id} style={{background:"linear-gradient(135deg,#0F172A,#1E3A8A)",borderRadius:12,padding:"14px 16px",marginBottom:10,cursor:"pointer"}} onClick={()=>setPage("arg-"+a.id)}>
              <div style={{fontSize:13,fontWeight:700,color:"#fff",fontFamily:"'Syne',sans-serif",marginBottom:4}}>{a.title}</div>
              <div style={{display:"flex",gap:12}}>
                <span style={{fontSize:11,color:"rgba(255,255,255,0.65)"}}>{a.fundingCommitment}</span>
                <Badge text={ARGONAUTS_STATUS[a.status]?.label||a.status} color={ARGONAUTS_STATUS[a.status]?.color||"#94A3B8"} sm />
              </div>
            </div>
          ))}
        </Card>
        <KokoWidget setPage={setPage} />
      </div>
      <Card style={{padding:20}} hover={false}>
        <SectionTitle title="Tracked IPs" action={()=>setPage("innovations")} actionLabel="Browse →" />
        {IP_DATA.filter(i=>i.status==="published").slice(0,3).map((ip,i) => (
          <div key={ip.id} style={{padding:"10px 0",borderBottom:i<2?"1px solid #F1F5F9":"none"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
              <div style={{fontSize:12,fontWeight:600,color:"#2563EB",cursor:"pointer",fontFamily:"'DM Sans',sans-serif"}} onClick={()=>setPage("ip-"+ip.id)}>{ip.title.slice(0,30)}…</div>
              <TRLBadge level={ip.trl} />
            </div>
            <ProgressBar value={Math.round((ip.fundingRaised/ip.fundingTarget)*100)} color="#7C3AED" h={4} />
          </div>
        ))}
      </Card>
    </div>
  </div>
);

const AdminDashboard = ({ setPage, argonautsList }) => {
  const pending = IP_DATA.filter(i=>i.status==="pending");
  const [statuses, setStatuses] = useState({});
  return (
    <div>
      <PageHeader title="Platform Analytics" sub="VIX Admin · VNU HCMC" />
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:22}}>
        {[{l:"Total IPs",v:IP_DATA.length,c:"#2563EB",icon:"◈"},{l:"Challenges",v:CHALLENGES.length,c:"#D97706",icon:"◎"},{l:"Argonauts",v:argonautsList.length,c:"#7C3AED",icon:"⚔"},{l:"Projects",v:PROJECTS.length,c:"#10B981",icon:"🤝"},{l:"Pending",v:pending.length,c:"#F59E0B",icon:"⏳"}].map((s,i) => (
          <Card key={i} style={{padding:"16px 18px"}} hover={false}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div>
                <div style={{fontSize:9,color:"#94A3B8",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:"'DM Sans',sans-serif"}}>{s.l}</div>
                <div style={{fontSize:26,fontWeight:900,color:s.c,fontFamily:"'Syne',sans-serif"}}>{s.v}</div>
              </div>
              <span style={{fontSize:20}}>{s.icon}</span>
            </div>
          </Card>
        ))}
      </div>
      <Card style={{padding:22,marginBottom:14}} hover={false}>
        <SectionTitle title="⚔ Argonauts Overview" action={()=>setPage("argonauts")} actionLabel="Manage →" />
        {argonautsList.map((a,i) => (
          <div key={a.id} style={{display:"flex",gap:12,alignItems:"center",padding:"11px 0",borderBottom:i<argonautsList.length-1?"1px solid #F1F5F9":"none"}}>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700,color:"#1E293B",fontFamily:"'Syne',sans-serif"}}>{a.title}</div>
              <div style={{fontSize:11,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>{a.org} · {a.fundingCommitment}</div>
            </div>
            <Badge text={ARGONAUTS_STATUS[a.status]?.label||a.status} color={ARGONAUTS_STATUS[a.status]?.color||"#94A3B8"} />
            <Badge text={`${a.candidates.length} applicants`} color="#7C3AED" sm />
            <Btn size="sm" color="#7C3AED" onClick={()=>setPage("arg-"+a.id)}>View</Btn>
          </div>
        ))}
      </Card>
      <Card style={{padding:22}} hover={false}>
        <SectionTitle title="Pending IP Approvals" sub={`${pending.length} awaiting review`} />
        {pending.length === 0 && <div style={{color:"#94A3B8",textAlign:"center",padding:36,fontFamily:"'DM Sans',sans-serif"}}>All clear! 🎉</div>}
        {pending.map((ip,i) => (
          <div key={ip.id} style={{display:"flex",gap:12,alignItems:"center",padding:"14px 0",borderBottom:i<pending.length-1?"1px solid #F1F5F9":"none"}}>
            <div style={{flex:1}}>
              <div style={{display:"flex",gap:6,marginBottom:5}}><Badge text={ip.field} color={CAT_COLORS[ip.field]||"#2563EB"} sm /><TRLBadge level={ip.trl} /></div>
              <div style={{fontSize:14,fontWeight:700,color:"#1E293B",fontFamily:"'Syne',sans-serif"}}>{ip.title}</div>
            </div>
            {statuses[ip.id]==="approved" ? <Badge text="✅ Approved" color="#10B981" />
             : statuses[ip.id]==="rejected" ? <Badge text="❌ Rejected" color="#EF4444" />
             : <div style={{display:"flex",gap:7}}>
                 <Btn size="sm" variant="success" onClick={()=>setStatuses(p=>({...p,[ip.id]:"approved"}))}>✓</Btn>
                 <Btn size="sm" variant="danger" onClick={()=>setStatuses(p=>({...p,[ip.id]:"rejected"}))}>✕</Btn>
               </div>}
          </div>
        ))}
      </Card>
    </div>
  );
};

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
const HomePage = ({ setPage, argonautsList }) => (
  <div>
    <div style={{background:"linear-gradient(135deg,#0F172A 0%,#1E3A8A 55%,#0891B2 100%)",borderRadius:24,padding:"56px 52px",marginBottom:28,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-80,right:-60,width:420,height:420,borderRadius:"50%",background:"rgba(255,255,255,0.04)"}} />
      <div style={{position:"relative",maxWidth:620}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(255,255,255,0.12)",borderRadius:20,padding:"5px 14px",marginBottom:18}}>
          <span>🏫</span><span style={{fontSize:11,color:"rgba(255,255,255,0.9)",fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>VNU – Ho Chi Minh City · Official Innovation Platform</span>
        </div>
        <h1 style={{fontSize:44,fontWeight:900,color:"#fff",margin:"0 0 14px",fontFamily:"'Syne',sans-serif",lineHeight:1.1}}>VNU HCMC<br /><span style={{color:"#7DD3FC"}}>Innovation Exchange</span></h1>
        <p style={{fontSize:14,color:"rgba(255,255,255,0.75)",lineHeight:1.85,margin:"0 0 28px",fontFamily:"'DM Sans',sans-serif"}}>A living marketplace connecting research IP, Argonauts grand challenges, industry problems, investment capital, and strategic partnerships.</p>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {[["Browse Innovations","#fff","innovations"],["⚔ Argonauts","rgba(124,58,237,0.8)","argonauts"],["Post Challenge","rgba(255,255,255,0.15)","challenges"]].map(([l,bg,pg],i) => (
            <button key={i} onClick={()=>setPage(pg)} style={{padding:"11px 22px",borderRadius:12,background:bg,color:i===0?"#1D4ED8":"rgba(255,255,255,0.95)",fontWeight:700,fontSize:13,cursor:"pointer",border:i===0?"none":"2px solid rgba(255,255,255,0.3)",fontFamily:"'DM Sans',sans-serif"}}>{l}</button>
          ))}
        </div>
      </div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:14,marginBottom:26}}>
      {[{icon:"◈",v:"247",l:"IPs Listed",c:"#2563EB"},{icon:"⚔",v:argonautsList.length,l:"Argonauts",c:"#7C3AED"},{icon:"◎",v:"38",l:"Challenges",c:"#D97706"},{icon:"💼",v:"47",l:"Investors",c:"#059669"},{icon:"🤝",v:"12",l:"Projects",c:"#0891B2"}].map((s,i) => (
        <Card key={i} style={{padding:18,textAlign:"center"}} hover={false}>
          <div style={{fontSize:20,marginBottom:5}}>{s.icon}</div>
          <div style={{fontSize:26,fontWeight:900,color:s.c,fontFamily:"'Syne',sans-serif",lineHeight:1}}>{s.v}</div>
          <div style={{fontSize:11,color:"#94A3B8",marginTop:4,fontFamily:"'DM Sans',sans-serif"}}>{s.l}</div>
        </Card>
      ))}
    </div>
    <SectionTitle title="⚔ Featured Argonauts Missions" action={()=>setPage("argonauts")} actionLabel="All Missions →" />
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:26}}>
      {argonautsList.slice(0,3).map(arg => <ArgonautsCard key={arg.id} arg={arg} onClick={()=>setPage("arg-"+arg.id)} />)}
    </div>
    <SectionTitle title="Featured Innovations" action={()=>setPage("innovations")} actionLabel="View All →" />
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
      {IP_DATA.filter(i=>i.status==="published").slice(0,3).map(ip => (
        <Card key={ip.id} onClick={()=>setPage("ip-"+ip.id)} style={{padding:20,cursor:"pointer"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
            <Badge text={ip.field} color={CAT_COLORS[ip.field]||"#2563EB"} />
            <div style={{display:"flex",gap:6,alignItems:"center"}}><TRLBadge level={ip.trl} /><KokoBtn type="innovations" item={ip} size="sm" /></div>
          </div>
          <h3 style={{fontSize:13,fontWeight:700,color:"#1E293B",margin:"0 0 5px",lineHeight:1.4,fontFamily:"'Syne',sans-serif"}}>{ip.title}</h3>
          <p style={{fontSize:11,color:"#64748B",lineHeight:1.6,margin:"0 0 10px",fontFamily:"'DM Sans',sans-serif"}}>{ip.desc}</p>
          <TRLMeter level={ip.trl} />
        </Card>
      ))}
    </div>
  </div>
);

// ═══════════════════════════════════════════════
//  APP ROOT
// ═══════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState("innovator");
  const [notifs, setNotifs] = useState([
    {id:"n1",type:"argonauts",text:"New Argonauts mission: Net-Zero Smart City – apply now!",time:"2h ago",read:false},
    {id:"n2",type:"invite",text:"You have been invited to join the Net-Zero Smart City Argonauts mission.",time:"4h ago",read:false},
    {id:"n3",type:"approval",text:"'AI Crop Detection' has been approved and published.",time:"1d ago",read:true},
  ]);
  const [notifOpen, setNotifOpen] = useState(false);
  const [argonautsList, setArgonautsList] = useState(ARGONAUTS_DATA_INIT);

  // KOKO state
  const [koko, setKoko] = useState({innovations:[],argonauts:[],challenges:[],projects:[],roles:[]});
  const isKoko = (type, id) => (koko[type]||[]).some(item=>item.id===id);
  const toggleKoko = (type, item) => {
    setKoko(prev => {
      const list = prev[type] || [];
      const exists = list.some(i=>i.id===item.id);
      if (exists) return {...prev,[type]:list.filter(i=>i.id!==item.id)};
      setNotifs(n=>[{id:"notif"+Date.now(),type:"koko",text:`"${item.title||item.role}" added to Koko.`,time:"Just now",read:false},...n]);
      return {...prev,[type]:[...list,item]};
    });
  };
  const removeKoko = (type, id) => setKoko(prev=>({...prev,[type]:(prev[type]||[]).filter(i=>i.id!==id)}));
  const totalKoko = koko.innovations.length + koko.argonauts.length + koko.challenges.length + koko.projects.length + koko.roles.length;

  const addNotif = (n) => setNotifs(prev=>[{id:"n"+Date.now(),...n,time:"Just now",read:false},...prev]);
  const unread = notifs.filter(n=>!n.read).length;
  const rc = ROLE_CFG[role];
  const curUser = USERS.find(u=>u.role===role) || USERS[0];

  const addArgonauts = (arg) => setArgonautsList(p=>[...p,arg]);
  const updateArgonauts = (updated) => setArgonautsList(p=>p.map(a=>a.id===updated.id?updated:a));

  const navSections = role === "admin"
    ? [{label:"Admin",items:[{id:"dashboard",label:"Platform Analytics",icon:"📊"},{id:"argonauts",label:"Argonauts",icon:"⚔"}]}]
    : [
        {label:"Platform",items:[{id:"home",label:"Home",icon:"⬡"},{id:"innovations",label:"Innovation Marketplace",icon:"◈"},{id:"argonauts",label:"Argonauts",icon:"⚔"},{id:"challenges",label:"Challenge Marketplace",icon:"◎"},{id:"funding",label:"Funding",icon:"◆"}]},
        {label:"Discover",items:[{id:"recruitment",label:"Team Recruitment",icon:"👥"}]},
        {label:"My Workspace",items:[{id:"my-innovations",label:"My Innovations",icon:"🔬"},{id:"my-projects",label:"My Projects",icon:"🗂"},{id:"koko",label:"Koko",icon:"⭐",kokoCount:true}]},
        {label:"Account",items:[{id:"dashboard",label:"Dashboard",icon:"📊"}]},
      ];

  const isActive = (id) => {
    if (page === id) return true;
    if (id === "innovations" && page.startsWith("ip-")) return true;
    if (id === "argonauts" && (page.startsWith("arg-") || page === "post-argonauts" || page.startsWith("edit-arg"))) return true;
    return false;
  };

  const renderPage = () => {
    if (page.startsWith("ip-")) {
      const ipId = page.replace("ip-","");
      const ip = IP_DATA.find(i=>i.id===ipId);
      const proj = PROJECTS.find(p=>p.ipId===ipId);
      return <IPDetailPage ip={ip} project={proj} setPage={setPage} role={role} addNotif={addNotif} />;
    }
    if (page.startsWith("arg-") && !page.startsWith("edit-arg")) {
      const argId = page.replace("arg-","");
      const arg = argonautsList.find(a=>a.id===argId);
      if (!arg) return <div style={{padding:60,textAlign:"center",color:"#94A3B8"}}>Mission not found.</div>;
      return <ArgonautsDetailPage arg={arg} setPage={setPage} role={role} addNotif={addNotif} updateArgonauts={updateArgonauts} />;
    }
    if (page.startsWith("edit-arg-")) {
      const argId = page.replace("edit-arg-","");
      const arg = argonautsList.find(a=>a.id===argId);
      return <PostArgonautsPage setPage={setPage} addNotif={addNotif} addArgonauts={addArgonauts} editData={arg} onUpdate={(updated)=>{updateArgonauts(updated);setPage("arg-"+argId);}} />;
    }
    switch (page) {
      case "home":            return <HomePage setPage={setPage} argonautsList={argonautsList} />;
      case "innovations":     return <InnovationMarketplace setPage={setPage} />;
      case "argonauts":       return <ArgonautsMarketplace setPage={setPage} argonautsList={argonautsList} addNotif={addNotif} />;
      case "post-argonauts":  return <PostArgonautsPage setPage={setPage} addNotif={addNotif} addArgonauts={addArgonauts} />;
      case "challenges":      return <ChallengeMarketplace setPage={setPage} addNotif={addNotif} />;
      case "funding":         return <FundingPage setPage={setPage} />;
      case "my-innovations":  return <MyInnovationsPage setPage={setPage} />;
      case "my-projects":     return <MyProjectsPage setPage={setPage} role={role} />;
      case "recruitment":     return <RecruitmentPage setPage={setPage} addNotif={addNotif} />;
      case "koko":            return <KokoPage setPage={setPage} />;
      case "create-ip":       return <CreateIPPage setPage={setPage} addNotif={addNotif} />;
      case "dashboard":
        if (role === "innovator") return <InnovatorDashboard setPage={setPage} addNotif={addNotif} argonautsList={argonautsList} />;
        if (role === "seeker")    return <SeekerDashboard    setPage={setPage} addNotif={addNotif} argonautsList={argonautsList} />;
        if (role === "investor")  return <InvestorDashboard  setPage={setPage} argonautsList={argonautsList} />;
        if (role === "admin")     return <AdminDashboard     setPage={setPage} argonautsList={argonautsList} />;
        return null;
      default: return <HomePage setPage={setPage} argonautsList={argonautsList} />;
    }
  };

  const pageName =
    page.startsWith("ip-")        ? "IP / Project Detail" :
    page.startsWith("arg-") && !page.startsWith("edit-arg") ? "Argonauts Mission Detail" :
    page.startsWith("edit-arg")   ? "Edit Argonauts" :
    page === "post-argonauts"      ? "Post Argonauts" :
    page === "koko"                ? "⭐ Koko" :
    navSections.flatMap(s=>s.items).find(n=>n.id===page)?.label || page;

  return (
    <KokoContext.Provider value={{koko, isKoko, toggleKoko, removeKoko}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { background:#F0F4FC; font-family:'DM Sans',sans-serif; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:#F0F4FC; }
        ::-webkit-scrollbar-thumb { background:#C7D2E8; border-radius:3px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        input:focus, textarea:focus, select:focus { border-color:#93C5FD!important; outline:none!important; }
      `}</style>

      <div style={{display:"flex",minHeight:"100vh"}}>
        {/* SIDEBAR */}
        <div style={{width:248,background:"#fff",borderRight:"1px solid #E8EDFB",display:"flex",flexDirection:"column",padding:"18px 10px",position:"fixed",top:0,left:0,height:"100vh",zIndex:100,boxShadow:"3px 0 16px rgba(37,99,235,0.06)",overflowY:"auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,padding:"0 6px",marginBottom:22}}>
            <div style={{width:40,height:40,borderRadius:12,background:"linear-gradient(135deg,#1D4ED8,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:900,color:"#fff",boxShadow:"0 4px 14px rgba(124,58,237,0.45)",flexShrink:0}}>V</div>
            <div>
              <div style={{fontSize:16,fontWeight:900,color:"#1E293B",fontFamily:"'Syne',sans-serif",lineHeight:1}}>VIX</div>
              <div style={{fontSize:8,color:"#94A3B8",letterSpacing:"0.1em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif"}}>VNU HCMC · Innovation</div>
            </div>
          </div>

          {/* Role switcher */}
          <div style={{background:"#F8FAFC",borderRadius:12,padding:9,marginBottom:18,border:"1px solid #E8EDFB"}}>
            <div style={{fontSize:8,fontWeight:700,color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:7,fontFamily:"'DM Sans',sans-serif"}}>Demo Role</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
              {Object.entries(ROLE_CFG).map(([r,cfg]) => (
                <button key={r} onClick={()=>{setRole(r);setPage("dashboard");}}
                  style={{padding:"6px 8px",borderRadius:9,border:`1.5px solid ${role===r?cfg.color:"#E8EDFB"}`,background:role===r?cfg.bg:"transparent",color:role===r?cfg.color:"#94A3B8",fontWeight:700,cursor:"pointer",fontSize:9.5,fontFamily:"'DM Sans',sans-serif",display:"flex",alignItems:"center",gap:4,justifyContent:"center"}}>
                  <span>{cfg.icon}</span>{cfg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nav */}
          {navSections.map(section => (
            <div key={section.label} style={{marginBottom:16}}>
              <div style={{fontSize:8.5,fontWeight:700,color:"#94A3B8",textTransform:"uppercase",letterSpacing:"0.14em",padding:"0 8px",marginBottom:5,fontFamily:"'DM Sans',sans-serif"}}>{section.label}</div>
              {section.items.map(item => {
                const active = isActive(item.id);
                const isKokoNav = item.id === "koko";
                const isArgNav = item.id === "argonauts";
                return (
                  <button key={item.id} onClick={()=>setPage(item.id)}
                    style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"9px 11px",borderRadius:10,marginBottom:1,background:active?(isKokoNav?"#FFFBEB":isArgNav?"#F5F0FF":"#EFF6FF"):"transparent",border:`1px solid ${active?(isKokoNav?"#FDE68A":isArgNav?"#DDD6FE":"#BFDBFE"):"transparent"}`,color:active?(isKokoNav?"#D97706":isArgNav?"#7C3AED":"#2563EB"):"#64748B",cursor:"pointer",fontSize:12,fontWeight:active?700:500,fontFamily:"'DM Sans',sans-serif",textAlign:"left"}}
                    onMouseEnter={e=>{if(!active){e.currentTarget.style.background="#F8FAFC";e.currentTarget.style.color="#374151";}}}
                    onMouseLeave={e=>{if(!active){e.currentTarget.style.background="transparent";e.currentTarget.style.color="#64748B";}}}>
                    <span style={{fontSize:14,color:isArgNav?"#7C3AED":undefined}}>{item.icon}</span>
                    <span style={{flex:1}}>{item.label}</span>
                    {item.kokoCount && totalKoko > 0 && <span style={{fontSize:9,background:active?"#D97706":"#F59E0B",color:"#fff",borderRadius:8,padding:"1px 6px",fontWeight:700,minWidth:18,textAlign:"center"}}>{totalKoko}</span>}
                    {isArgNav && <span style={{fontSize:8,background:active?"#7C3AED":"#F5F0FF",color:active?"#fff":"#7C3AED",borderRadius:6,padding:"2px 5px",fontWeight:700}}>NEW</span>}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Footer */}
          <div style={{marginTop:"auto",borderTop:"1px solid #F1F5F9",paddingTop:12}}>
            <div style={{display:"flex",alignItems:"center",gap:9,padding:"0 4px"}}>
              <Avatar name={curUser.name} size={32} color={rc.color} />
              <div style={{flex:1,overflow:"hidden"}}>
                <div style={{fontSize:11,fontWeight:700,color:"#1E293B",fontFamily:"'DM Sans',sans-serif",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{curUser.name}</div>
                <div style={{fontSize:10,color:"#94A3B8",fontFamily:"'DM Sans',sans-serif"}}>{rc.icon} {rc.label}</div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div style={{flex:1,marginLeft:248,display:"flex",flexDirection:"column",minHeight:"100vh"}}>
          {/* Top bar */}
          <div style={{background:"#fff",borderBottom:"1px solid #E8EDFB",padding:"0 28px",height:54,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:90,boxShadow:"0 1px 6px rgba(0,0,0,0.04)"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#1E293B",fontFamily:"'DM Sans',sans-serif"}}>{pageName}</div>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              {/* Koko shortcut */}
              <button onClick={()=>setPage("koko")} title="My Koko"
                style={{position:"relative",background:page==="koko"?"#FFFBEB":"#F8FAFC",border:`1.5px solid ${page==="koko"?"#F59E0B":"#E8EDFB"}`,borderRadius:10,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:16}}>
                ⭐
                {totalKoko > 0 && <div style={{position:"absolute",top:-4,right:-4,width:17,height:17,borderRadius:"50%",background:"#F59E0B",color:"#fff",fontSize:8,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center"}}>{totalKoko}</div>}
              </button>
              {/* Notif bell */}
              <div style={{position:"relative"}}>
                <button onClick={()=>setNotifOpen(!notifOpen)}
                  style={{background:"#F8FAFC",border:"1.5px solid #E8EDFB",borderRadius:10,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:16,position:"relative"}}>
                  🔔
                  {unread > 0 && <div style={{position:"absolute",top:-4,right:-4,width:17,height:17,borderRadius:"50%",background:"#EF4444",color:"#fff",fontSize:8,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center"}}>{unread}</div>}
                </button>
                {notifOpen && (
                  <div style={{position:"absolute",top:"calc(100% + 8px)",right:0,width:360,background:"#fff",border:"1px solid #E8EDFB",borderRadius:16,boxShadow:"0 16px 50px rgba(0,0,0,0.15)",zIndex:200,overflow:"hidden"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"13px 17px",borderBottom:"1px solid #F1F5F9"}}>
                      <span style={{fontSize:14,fontWeight:700,color:"#1E293B",fontFamily:"'Syne',sans-serif"}}>Notifications</span>
                      <button onClick={()=>setNotifs(n=>n.map(x=>({...x,read:true})))} style={{fontSize:11,color:"#2563EB",background:"none",border:"none",cursor:"pointer"}}>Mark all read</button>
                    </div>
                    <div style={{maxHeight:340,overflow:"auto"}}>
                      {notifs.map(n => (
                        <div key={n.id} onClick={()=>setNotifs(p=>p.map(x=>x.id===n.id?{...x,read:true}:x))}
                          style={{display:"flex",gap:11,padding:"11px 17px",background:n.read?"#fff":"#EFF6FF",borderBottom:"1px solid #F8FAFC",cursor:"pointer"}}>
                          <span style={{fontSize:17,flexShrink:0}}>{NOTIF_ICONS[n.type]||"🔔"}</span>
                          <div style={{flex:1}}>
                            <div style={{fontSize:12,color:"#374151",lineHeight:1.5,fontFamily:"'DM Sans',sans-serif"}}>{n.text}</div>
                            <div style={{fontSize:10,color:"#94A3B8",marginTop:2,fontFamily:"'DM Sans',sans-serif"}}>{n.time}</div>
                          </div>
                          {!n.read && <div style={{width:7,height:7,borderRadius:"50%",background:"#2563EB",flexShrink:0,marginTop:5}} />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Role chip */}
              <div style={{display:"flex",alignItems:"center",gap:7,background:rc.bg,border:`1.5px solid ${rc.color}28`,borderRadius:10,padding:"6px 12px"}}>
                <Avatar name={curUser.name} size={22} color={rc.color} />
                <span style={{fontSize:12,fontWeight:700,color:rc.color,fontFamily:"'DM Sans',sans-serif"}}>{rc.icon} {rc.label}</span>
              </div>
            </div>
          </div>

          {/* Page content */}
          <div style={{flex:1,padding:"26px 30px",animation:"fadeUp 0.25s ease"}} key={page}>
            {renderPage()}
          </div>
        </div>
      </div>
    </KokoContext.Provider>
  );
}
