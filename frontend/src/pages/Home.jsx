import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Inject Legacy CSS
    const styleEl = document.createElement('style');
    styleEl.id = 'legacy-home-style';
    styleEl.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
      :root {
        --ink: #f4f4f8; --glass: rgba(0,0,0,.03); --glass2: rgba(0,0,0,.06);
        --border: rgba(0,0,0,.03); --border2: rgba(0,0,0,.05);
        --accent: #6c5ce7; --accent2: #a29bfe; --cyan: #00cec9; --gold: #fdcb6e;
        --green: #00b894; --pink: #fd79a8; --red: #d63031;
        --text: #1a1a24; --text2: #4a4a5e; --text3: #7b7b8f; --r: 14px; --r2: 22px;
      }
      body.legacy-active {
        background: var(--ink); color: var(--text); font-family: 'Outfit', sans-serif;
        font-size: 16px; line-height: 1.6; overflow-x: hidden;
      }
      .legacy-root * { margin: 0; padding: 0; box-sizing: border-box; }
      #bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
      #app { position: relative; z-index: 1; }
      
      /* Typography overrides in legacy-root */
      .legacy-root h1, .legacy-root h2, .legacy-root h3 { font-family: 'Outfit', sans-serif; color: var(--text); }
      .legacy-root p { color: var(--text2); }
      .legacy-root nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; display: flex; align-items: center; justify-content: space-between; padding: 1.1rem 3rem; background: rgba(244,244,248,.8); backdrop-filter: blur(24px); border-bottom: 1px solid var(--border); box-shadow: 0 4px 30px rgba(0,0,0,0.05); }
      .legacy-root .logo { font-family: 'Outfit', sans-serif; font-size: 1.4rem; font-weight: 800; background: linear-gradient(135deg, var(--accent), var(--cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; cursor: pointer; }
      .legacy-root .nav-links { display: flex; gap: 2rem; align-items: center; }
      .legacy-root .nav-links a { color: var(--text2); text-decoration: none; font-size: .88rem; font-weight: 500; transition: color .2s; cursor: pointer; }
      .legacy-root .nav-links a:hover { color: var(--text); }
      .legacy-root .nav-auth { display: flex; gap: .75rem; align-items: center; }
      .legacy-root .btn-nav { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border: none; border-radius: 50px; padding: .5rem 1.4rem; font-size: .85rem; font-weight: 600; cursor: pointer; font-family: 'Outfit', sans-serif; transition: all .2s; }
      .legacy-root .btn-nav:hover { transform: translateY(-1px); box-shadow: 0 0 30px rgba(108,92,231,.45); }
      .legacy-root .btn-nav-ghost { background: transparent; border: 1px solid var(--border2); color: var(--text); border-radius: 50px; padding: .5rem 1.2rem; font-size: .85rem; font-weight: 500; cursor: pointer; font-family: 'Outfit', sans-serif; transition: all .2s; }
      .legacy-root .btn-nav-ghost:hover { background: var(--glass2); }
      .legacy-root .user-badge { display: flex; align-items: center; gap: .5rem; font-size: .85rem; color: var(--text2); }
      .legacy-root .user-badge strong { color: var(--text); }
      .legacy-root .user-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); }
      .legacy-root .hidden { display: none !important; }
      
      .legacy-root #hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column; text-align: center; padding: 8rem 2rem 5rem; position: relative; }
      .legacy-root .badge { display: inline-flex; align-items: center; gap: .6rem; background: rgba(108,92,231,.1); border: 1px solid rgba(108,92,231,.25); border-radius: 50px; padding: .4rem 1.1rem; font-size: .78rem; color: var(--accent); font-weight: 600; margin-bottom: 2.2rem; animation: fup .9s ease both; }
      .legacy-root .bdot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; }
      @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .4; transform: scale(1.5); } }
      .legacy-root .htitle { font-size: clamp(3rem, 7.5vw, 6rem); font-weight: 800; line-height: 1.0; letter-spacing: -.045em; max-width: 950px; animation: fup .9s .1s ease both; }
      .legacy-root .gtext { background: linear-gradient(135deg, var(--accent) 0%, var(--cyan) 45%, var(--accent2) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-size: 200% 200%; animation: gshift 4s ease infinite; }
      @keyframes gshift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
      .legacy-root .hsub { margin-top: 1.8rem; font-size: 1.05rem; color: var(--text2); max-width: 560px; font-weight: 400; line-height: 1.75; animation: fup .9s .25s ease both; }
      .legacy-root .hacts { display: flex; gap: 1rem; margin-top: 2.8rem; flex-wrap: wrap; justify-content: center; animation: fup .9s .4s ease both; }
      .legacy-root .btn-p { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border: none; border-radius: 50px; padding: .9rem 2.4rem; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all .3s; font-family: 'DM Sans', sans-serif; box-shadow: 0 0 40px rgba(108,92,231,.3); position: relative; overflow: hidden; }
      .legacy-root .btn-p::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, transparent, rgba(255,255,255,.2), transparent); transform: translateX(-100%); transition: .5s; }
      .legacy-root .btn-p:hover::before { transform: translateX(100%); }
      .legacy-root .btn-p:hover { transform: translateY(-3px); box-shadow: 0 0 60px rgba(108,92,231,.5); }
      .legacy-root .btn-g { background: #fff; color: var(--text); border: 1px solid var(--border2); border-radius: 50px; padding: .9rem 2.4rem; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all .25s; font-family: 'DM Sans', sans-serif; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
      .legacy-root .btn-g:hover { background: #f0f0f5; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
      .legacy-root .hstats { display: flex; gap: 4rem; margin-top: 4.5rem; animation: fup .9s .55s ease both; }
      .legacy-root .sn { font-family: 'Syne', sans-serif; font-size: 2.2rem; font-weight: 800; background: linear-gradient(135deg, var(--gold), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .legacy-root .sl { font-size: .78rem; color: var(--text2); margin-top: .1rem; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; }
      .legacy-root .scroll-h { position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: .6rem; animation: sbounce 2.5s infinite; }
      .legacy-root .sh-lbl { font-size: .72rem; color: var(--text2); font-weight: 600; letter-spacing: .15em; text-transform: uppercase; }
      .legacy-root .sh-line { width: 1px; height: 40px; background: linear-gradient(var(--accent), transparent); }
      @keyframes sbounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-10px); } }
      .legacy-root .sw { padding: 7rem 3rem; max-width: 1200px; margin: 0 auto; }
      .legacy-root .stag { display: inline-block; font-size: .72rem; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: var(--accent); margin-bottom: .8rem; }
      .legacy-root .stitle { font-size: clamp(2rem, 4.5vw, 3.2rem); font-weight: 800; line-height: 1.12; letter-spacing: -.035em; margin-bottom: 1rem; }
      .legacy-root .ssub { color: var(--text2); font-size: 1rem; max-width: 540px; font-weight: 400; line-height: 1.7; }
      .legacy-root .moti { text-align: center; padding: 4rem 2rem; max-width: 820px; margin: 0 auto; transform: translateY(50px); opacity: 0; transition: transform .8s ease, opacity .8s ease; }
      .legacy-root .moti.vis { transform: translateY(0); opacity: 1; }
      .legacy-root .mq { font-size: clamp(1.6rem, 4vw, 3rem); font-weight: 800; line-height: 1.2; letter-spacing: -.03em; margin-bottom: 1rem; }
      .legacy-root .mq span { background: linear-gradient(135deg, var(--accent), var(--pink), var(--cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .legacy-root .mp { color: var(--text2); font-size: 1rem; font-weight: 400; }
      .legacy-root .fgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(285px, 1fr)); gap: 1.5rem; margin-top: 3.5rem; }
      .legacy-root .fcard { background: #fff; border: 1px solid var(--border); border-radius: var(--r2); padding: 1.8rem; position: relative; overflow: hidden; transform: translateY(55px); opacity: 0; transition: transform .7s ease, opacity .7s ease, border-color .3s, box-shadow .3s; box-shadow: 0 4px 15px rgba(0,0,0,0.04); }
      .legacy-root .fcard.vis { transform: translateY(0); opacity: 1; }
      .legacy-root .fcard::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 15% 15%, rgba(108,92,231,.05), transparent 55%); opacity: 0; transition: opacity .3s; }
      .legacy-root .fcard:hover { border-color: rgba(108,92,231,.4); transform: translateY(-7px) !important; box-shadow: 0 16px 48px rgba(0,0,0,.08); }
      .legacy-root .fcard:hover::before { opacity: 1; }
      .legacy-root .fico { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; margin-bottom: 1.2rem; }
      .legacy-root .ftitle { font-size: 1.05rem; font-weight: 800; margin-bottom: .4rem; }
      .legacy-root .fdesc { color: var(--text2); font-size: .875rem; line-height: 1.6; font-weight: 400; }
      .legacy-root .sgrid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
      .legacy-root .scard { background: #fff; border: 1px solid var(--border); border-radius: var(--r2); padding: 1.8rem; text-align: center; position: relative; transform: translateY(55px); opacity: 0; transition: transform .7s ease, opacity .7s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.04); }
      .legacy-root .scard.vis { transform: translateY(0); opacity: 1; }
      .legacy-root .scard:hover { border-color: var(--border2); transform: translateY(-4px) !important; box-shadow: 0 12px 30px rgba(0,0,0,0.08); }
      .legacy-root .snum { font-size: 4rem; font-weight: 800; color: rgba(108,92,231,.08); position: absolute; top: .8rem; right: 1rem; line-height: 1; }
      .legacy-root .sico { font-size: 1.8rem; margin-bottom: .8rem; }
      .legacy-root .scard h3 { font-size: 1rem; font-weight: 800; margin-bottom: .35rem; }
      .legacy-root .scard p { color: var(--text2); font-size: .85rem; font-weight: 400; line-height: 1.55; }
      .legacy-root #github-s { padding: 0 3rem 5rem; max-width: 900px; margin: 0 auto; }
      .legacy-root .ghcard { background: #fff; border: 1px solid var(--border2); border-radius: var(--r2); padding: 3rem; text-align: center; position: relative; overflow: hidden; transform: translateY(55px); opacity: 0; transition: transform .8s ease, opacity .8s ease; box-shadow: 0 8px 30px rgba(0,0,0,0.05); }
      .legacy-root .ghcard.vis { transform: translateY(0); opacity: 1; }
      .legacy-root .ghcard::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 50% -20%, rgba(108,92,231,.08), transparent 65%); pointer-events: none; }
      .legacy-root .ghcard h2 { font-size: 1.7rem; font-weight: 800; margin-bottom: .6rem; }
      .legacy-root .ghcard p { color: var(--text2); font-size: .95rem; font-weight: 400; max-width: 480px; margin: 0 auto 2rem; }
      .legacy-root .ghr { display: flex; gap: .75rem; max-width: 480px; margin: 0 auto; }
      .legacy-root .ghi { flex: 1; background: #f8f9fa; border: 1px solid var(--border2); border-radius: 12px; color: var(--text); font-family: 'Outfit', sans-serif; font-size: .95rem; padding: .85rem 1.1rem; outline: none; transition: border-color .2s; }
      .legacy-root .ghi:focus { border-color: var(--accent); background: #fff; box-shadow: 0 0 0 3px rgba(108,92,231,.1); }
      .legacy-root .ghi::placeholder { color: var(--text3); }
      .legacy-root .btn-conn { background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; color: #fff; border-radius: 12px; padding: .85rem 1.5rem; font-size: .9rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; white-space: nowrap; transition: all .2s; }
      .legacy-root .btn-conn:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(108,92,231,.4); }
      .legacy-root #ghp { display: none; margin-top: 2rem; }
      .legacy-root .ghpc { display: flex; align-items: center; gap: 1.5rem; background: #f8f9fa; border: 1px solid var(--border2); border-radius: 16px; padding: 1.5rem; text-align: left; flex-wrap: wrap; }
      .legacy-root .ghav { width: 64px; height: 64px; border-radius: 50%; border: 2px solid var(--accent); }
      .legacy-root .ghpi h3 { font-size: 1.05rem; font-weight: 800; }
      .legacy-root .ghst { display: flex; gap: 1.5rem; margin-top: .7rem; flex-wrap: wrap; }
      .legacy-root .ghst span { font-size: .82rem; color: var(--text2); }
      .legacy-root .ghst b { color: var(--accent); font-weight: 700; }
      .legacy-root .ghlg { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: .7rem; }
      .legacy-root .ghl { padding: .2rem .65rem; border-radius: 50px; font-size: .72rem; background: rgba(108,92,231,.08); border: 1px solid rgba(108,92,231,.2); color: var(--accent); font-weight: 600; }
      .legacy-root #form-s { padding: 0 3rem 6rem; max-width: 1100px; margin: 0 auto; }
      .legacy-root .fwrap { background: #fff; border: 1px solid var(--border2); border-radius: 24px; padding: 3rem; position: relative; overflow: hidden; transform: translateY(55px); opacity: 0; transition: transform .8s ease, opacity .8s ease; box-shadow: 0 10px 40px rgba(0,0,0,0.05); }
      .legacy-root .fwrap.vis { transform: translateY(0); opacity: 1; }
      .legacy-root .sbar { display: flex; align-items: center; background: #f0f0f5; border: 1px solid var(--border); border-radius: 50px; padding: .3rem; margin-bottom: 2.5rem; }
      .legacy-root .spill { flex: 1; text-align: center; padding: .55rem .5rem; border-radius: 50px; font-size: .8rem; font-weight: 600; color: var(--text2); cursor: pointer; transition: all .3s; }
      .legacy-root .spill.act { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; box-shadow: 0 4px 15px rgba(108,92,231,.3); }
      .legacy-root .spill.dn { color: var(--green); background: rgba(0,184,148,.1); }
      .legacy-root .fpg { display: none; animation: fin .4s ease; }
      .legacy-root .fpg.act { display: block; }
      @keyframes fin { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      .legacy-root .fgd { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
      .legacy-root .fl { display: flex; flex-direction: column; gap: .45rem; }
      .legacy-root .fl.full { grid-column: 1/-1; }
      .legacy-root .fl label { font-size: .82rem; font-weight: 600; color: var(--text2); }
      .legacy-root .fl input, .legacy-root .fl select, .legacy-root .fl textarea { background: #f8f9fa; border: 1px solid var(--border2); border-radius: 10px; color: var(--text); font-family: 'Outfit', sans-serif; font-size: .92rem; padding: .72rem 1rem; outline: none; transition: border-color .2s, background .2s, box-shadow .2s; }
      .legacy-root .fl input:focus, .legacy-root .fl select:focus, .legacy-root .fl textarea:focus { border-color: var(--accent); background: #fff; box-shadow: 0 0 0 3px rgba(108,92,231,.1); }
      .legacy-root .fl select option { background: #fff; color: var(--text); }
      .legacy-root .fl textarea { resize: vertical; min-height: 90px; }
      .legacy-root .stw { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .35rem; }
      .legacy-root .stag2 { padding: .3rem .85rem; border-radius: 50px; font-size: .8rem; border: 1px solid var(--border); color: var(--text2); cursor: pointer; transition: all .2s; font-weight: 500; background: #fff; }
      .legacy-root .stag2:hover { border-color: var(--border2); color: var(--text); }
      .legacy-root .stag2.on { background: rgba(108,92,231,.1); border-color: rgba(108,92,231,.4); color: var(--accent); font-weight: 600; }
      .legacy-root .slbl { display: flex; flex-direction: column; gap: .85rem; }
      .legacy-root .slr { display: flex; align-items: center; gap: 1rem; }
      .legacy-root .slr label { font-size: .82rem; color: var(--text2); width: 155px; flex-shrink: 0; }
      .legacy-root .slr input[type=range] { flex: 1; -webkit-appearance: none; height: 4px; background: #e0e0eb; border-radius: 2px; outline: none; cursor: pointer; }
      .legacy-root .slr input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent2)); cursor: pointer; box-shadow: 0 2px 6px rgba(108,92,231,.5); }
      .legacy-root .slv { font-size: .82rem; font-weight: 800; color: var(--accent); width: 24px; text-align: right; }
      .legacy-root .fnav { display: flex; justify-content: space-between; margin-top: 2rem; gap: 1rem; }
      .legacy-root .btn-bk { background: #fff; border: 1px solid var(--border); color: var(--text2); border-radius: 50px; padding: .7rem 1.6rem; font-size: .88rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .2s; }
      .legacy-root .btn-bk:hover { border-color: var(--border2); color: var(--text); background: #f8f9fa; }
      .legacy-root .btn-nx { background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; color: #fff; border-radius: 50px; padding: .7rem 2rem; font-size: .88rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .25s; box-shadow: 0 4px 15px rgba(108,92,231,.3); }
      .legacy-root .btn-nx:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(108,92,231,.4); }
      .legacy-root .btn-an { background: linear-gradient(135deg, var(--accent), var(--accent2), var(--cyan)); border: none; color: #fff; border-radius: 50px; padding: .9rem 2.8rem; font-size: 1rem; font-weight: 800; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .3s; box-shadow: 0 8px 30px rgba(108,92,231,.4); position: relative; overflow: hidden; }
      .legacy-root .btn-an::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, transparent, rgba(255,255,255,.25), transparent); transform: translateX(-100%); transition: .5s; }
      .legacy-root .btn-an:hover::before { transform: translateX(100%); }
      .legacy-root .btn-an:disabled { opacity: .45; cursor: not-allowed; transform: none; box-shadow: none; }
      .legacy-root #res-s { padding: 0 3rem 6rem; max-width: 1100px; margin: 0 auto; display: none; }
      .legacy-root .rcard { background: #fff; border: 1px solid var(--border2); border-radius: 24px; overflow: hidden; box-shadow: 0 15px 50px rgba(0,0,0,0.06); }
      .legacy-root .rheader { background: linear-gradient(135deg, var(--accent), var(--accent2), var(--cyan)); padding: 2.2rem 2.5rem; display: flex; align-items: center; justify-content: space-between; }
      .legacy-root .rheader h2 { font-size: 1.5rem; font-weight: 800; color: #fff; }
      .legacy-root .rbody { padding: 2.5rem; }
      .legacy-root .pcard { background: #fff; border: 1px solid var(--border); border-radius: 18px; padding: 1.5rem; display: grid; grid-template-columns: auto 1fr auto; gap: 1.5rem; align-items: start; transition: all .3s; margin-bottom: 1.5rem; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
      .legacy-root .pcard:hover { border-color: rgba(108,92,231,.3); transform: translateX(4px); box-shadow: 0 8px 25px rgba(0,0,0,0.06); }
      .legacy-root .rbdg { width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem; background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; box-shadow: 0 4px 10px rgba(108,92,231,.3); }
      .legacy-root .wgrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(238px, 1fr)); gap: 1rem; }
      .legacy-root .wcard { background: #fff; border: 1px solid var(--border); border-radius: 14px; padding: 1.2rem; transition: all .25s; cursor: pointer; position: relative; overflow: hidden; box-shadow: 0 3px 10px rgba(0,0,0,0.02); }
      .legacy-root .wcard::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--wc, var(--accent)); transform: scaleX(0); transition: transform .3s; transform-origin: left; }
      .legacy-root .wcard:hover::after { transform: scaleX(1); }
      .legacy-root .wcard:hover { border-color: var(--border2); transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,.08); }
      .legacy-root .wcard.dw { background: rgba(0,184,148,.05); border-color: rgba(0,184,148,.2); }
      .legacy-root .wnum { font-size: .7rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; margin-bottom: .3rem; }
      .legacy-root .wtags { display: flex; flex-wrap: wrap; gap: .3rem; margin-top: .6rem; }
      .legacy-root .wtag { padding: .15rem .5rem; border-radius: 50px; font-size: .68rem; background: rgba(0,206,201,.1); border: 1px solid rgba(0,206,201,.2); color: var(--cyan); font-weight: 600; }
      .legacy-root .wchk { position: absolute; top: .75rem; right: .75rem; width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: .68rem; transition: all .2s; color: transparent; background: #fff; }
      .legacy-root .wchk.ck { background: var(--green); border-color: var(--green); color: #fff; }
      .legacy-root .ggrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: .85rem; margin-top: 1rem; }
      .legacy-root .gitem { background: #fff; border: 1px solid var(--border); border-radius: 12px; padding: 1rem; box-shadow: 0 3px 10px rgba(0,0,0,0.02); }
      .legacy-root .gbar { height: 5px; background: #e0e0eb; border-radius: 2px; overflow: hidden; margin-top: .25rem; }
      .legacy-root .gfill { height: 100%; border-radius: 2px; transition: width 1.2s cubic-bezier(.4,0,.2,1); }
      .legacy-root .igrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin: 2rem 0; }
      .legacy-root .ibox { background: #fff; border: 1px solid var(--border); border-radius: var(--r); padding: 1.2rem; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
      .legacy-root .lwrap { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem; text-align: center; gap: 1.8rem; }
      .legacy-root .ldr { width: 52px; height: 52px; border: 3px solid var(--border); border-top-color: var(--accent); border-radius: 50%; animation: spin .75s linear infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .legacy-root .ls { font-size: .82rem; color: var(--text2); transition: color .3s; font-weight: 600; }
      .legacy-root .ls.act { color: var(--accent); animation: blk 1s infinite; }
      .legacy-root .ls.dn { color: var(--green); }
      @keyframes blk { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
      .legacy-root footer { border-top: 1px solid var(--border); padding: 2rem 3rem; display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto; color: var(--text3); font-weight: 500; }
      @media(max-width:768px) { .legacy-root nav { padding: 1rem 1.5rem; } .legacy-root .sw, .legacy-root #github-s, .legacy-root #form-s, .legacy-root #res-s { padding-left: 1.5rem; padding-right: 1.5rem; } }
    `;
    document.head.appendChild(styleEl);
    document.body.classList.add('legacy-active');

    // 2. Load Three.js & Custom Script
    const loadScript = () => {
      // Basic Intersection Observers
      var io = new IntersectionObserver(function (e) { e.forEach(function (x) { if (x.isIntersecting) x.target.classList.add('vis'); }); }, { threshold: .07 });
      document.querySelectorAll('.fcard,.scard,.ghcard,.fwrap,.moti').forEach(function (el, i) {
        el.style.transitionDelay = (i % 4) * .1 + 's'; io.observe(el);
      });

      // Assign globals so inline onClick handlers work
      window.s2 = (id) => document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.tog = (el) => el.classList.toggle('on');
      window.sv = (el, id) => document.getElementById(id).textContent = el.value;
      window.gv = (id) => { var el = document.getElementById(id); return el ? el.value : ''; };

      window._cs = 1;
      window.gostep = (n) => {
        if (n > window._cs) return;
        document.getElementById('fp' + window._cs).classList.remove('act'); document.getElementById('p' + window._cs).classList.remove('act');
        window._cs = n;
        document.getElementById('fp' + window._cs).classList.add('act'); document.getElementById('p' + window._cs).classList.add('act');
      };
      window.nxt = (f) => {
        document.getElementById('fp' + f).classList.remove('act'); document.getElementById('p' + f).classList.remove('act');
        document.getElementById('p' + f).classList.add('dn'); window._cs = f + 1;
        document.getElementById('fp' + window._cs).classList.add('act'); document.getElementById('p' + window._cs).classList.add('act');
        window.s2('form-s');
      };
      window.prv = (f) => {
        document.getElementById('fp' + f).classList.remove('act'); document.getElementById('p' + f).classList.remove('act');
        window._cs = f - 1;
        document.getElementById('fp' + window._cs).classList.add('act'); document.getElementById('p' + window._cs).classList.add('act');
        document.getElementById('p' + window._cs).classList.remove('dn');
      };

      window.doLogout = () => {
        localStorage.removeItem('cf_token');
        localStorage.removeItem('cf_user');
        window.location.href = '/';
      };

      // API call helper
      window.apiCall = async (path, method, body) => {
        var opts = { method: method || 'GET', headers: { 'Content-Type': 'application/json' } };
        var authToken = localStorage.getItem('cf_token');
        if (authToken) opts.headers['Authorization'] = 'Bearer ' + authToken;
        if (body) opts.body = JSON.stringify(body);
        var res = await fetch('http://localhost:5000/api' + path, opts);
        var data = await res.json();
        if (!data.success) throw new Error(data.message || 'Request failed');
        return data;
      };

      // GitHub
      window.loadGH = async () => {
        var un = document.getElementById('ghu').value.trim();
        if (!un) return;
        var box = document.getElementById('ghp');
        box.style.display = 'block'; box.innerHTML = '<div style="color:var(--text2);font-size:.88rem;padding:1rem 0">Fetching GitHub profile via backend...</div>';
        try {
          var res = await window.apiCall('/github/analyze', 'POST', { username: un });
          window.ghd = res.data;
          var u = res.data;
          var langHtml = (u.languages || []).map(function (l) { return '<span class="ghl">' + l + '</span>'; }).join('');
          box.innerHTML = '<div class="ghpc"><img src="' + u.avatarUrl + '" class="ghav" alt="avatar"/><div class="ghpi" style="flex:1"><h3>' + (u.name || un) + '</h3><p>' + (u.bio || 'GitHub user') + '</p><div class="ghst"><span>Repos: <b>' + u.publicRepos + '</b></span><span>Followers: <b>' + u.followers + '</b></span></div><div class="ghlg">' + langHtml + '</div></div></div><div style="margin-top:.75rem;padding:.75rem;background:rgba(74,222,128,.07);border:1px solid rgba(74,222,128,.2);border-radius:10px;font-size:.85rem;color:var(--green)">GitHub profile loaded! Scroll down to complete your details.</div>';
          setTimeout(function () { window.s2('form-s'); }, 800);
        } catch (e) { box.innerHTML = '<div style="color:var(--red);font-size:.85rem;padding:.75rem">Could not load profile: ' + e.message + '</div>'; }
      };

      // Run AI
      window.runAI = async () => {
        var token = localStorage.getItem('cf_token');
        if (!token) return alert('Please login first');
        var btn = document.getElementById('ab');
        btn.textContent = 'Analyzing...'; btn.disabled = true;
        var rs = document.getElementById('res-s');
        rs.style.display = 'block'; rs.scrollIntoView({ behavior: 'smooth' });
        var rb = document.getElementById('rb');
        rb.innerHTML = '<div class="lwrap"><div class="ldr"></div><div><div style="font-size:1rem;font-weight:500;color:var(--text);margin-bottom:1rem">Building your personalized roadmap...</div><div class="lstps"><div class="ls act" id="l0">Analyzing your GitHub and background</div><div class="ls" id="l1">Mapping to your target role</div><div class="ls" id="l2">Identifying skill gaps</div><div class="ls" id="l3">Building week-by-week schedule</div><div class="ls" id="l4">Selecting best resources for you</div><div class="ls" id="l5">Saving your roadmap to database</div></div></div></div>';

        var li = 0;
        var lt = setInterval(function () {
          var c = document.getElementById('l' + li);
          if (c) { c.classList.remove('act'); c.classList.add('dn'); c.textContent = 'Done: ' + c.textContent; }
          li++; var n = document.getElementById('l' + li); if (n) n.classList.add('act'); if (li >= 6) clearInterval(lt);
        }, 1500);

        var sk = [].slice.call(document.querySelectorAll('#tsk .stag2.on')).map(t => t.textContent);
        var profile = {
          name: window.gv('fn') || 'Student',
          education: window.gv('fe'), college: window.gv('fc'),
          skills: sk,
          selfRatings: { coding: parseInt(window.gv('sv0')) || 5, systemDesign: parseInt(window.gv('sv1')) || 3, dsa: parseInt(window.gv('sv2')) || 4, communication: parseInt(window.gv('sv3')) || 5, projects: parseInt(window.gv('sv4')) || 5 },
          targetRole: window.gv('fro'),
          timeline: window.gv('ftl'), targetLocation: window.gv('fl2'),
          obstacles: window.gv('fob'),
          learningStyle: window.gv('fls'), consistency: window.gv('fco'),
          extra: window.gv('fex'),
          githubUsername: window.ghd ? window.ghd.username : '',
          githubLanguages: window.ghd ? window.ghd.languages : []
        };
        try {
          var res = await window.apiCall('/ai/generate', 'POST', { profile, githubData: window.ghd });
          clearInterval(lt);
          window._roadmapId = res.data.roadmapId;
          const d = res.data.aiResult;
          document.getElementById('rn').textContent = (d.name || 'Your') + ' - ' + (d.targetRole || 'Career Roadmap');

          var sc2 = Math.min(99, Math.max(10, parseInt(d.overallMatch) || 80));
          var tc = d.topCareer;
          let h = '<div class="pcard"><div class="rbdg">&#127919;</div><div><div class="ptitle">' + tc.title + '</div><div class="pmeta">' + tc.field + ' - ' + tc.salaryRange + ' - ' + tc.growthOutlook + ' growth</div><p class="pwhy">' + tc.whyFit + '</p></div></div>';
          h += '<div class="wgrid">';
          (d.weeklyRoadmap || []).forEach(function (w, i) {
            h += '<div class="wcard"><div class="wnum">' + w.week + '</div><div class="wtitle">' + w.title + '</div><div class="wdesc">' + w.description + '</div></div>';
          });
          h += '</div>';
          rb.innerHTML = h;
        } catch (e) {
          clearInterval(lt);
          rb.innerHTML = '<div style="color:var(--red)">Failed: ' + e.message + '</div>';
        }
        btn.textContent = 'Generate My Roadmap'; btn.disabled = false;
      };

      // Ensure THREE.js is loaded
      if (!window.THREE) {
        const s = document.createElement('script');
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        s.onload = initThree;
        document.body.appendChild(s);
      } else {
        initThree();
      }

      function initThree() {
        if (window._threeInited) return;
        window._threeInited = true;

        // 3D Scene
        var bgCv = document.getElementById('bg');
        if (!bgCv) return;
        var rdr = new THREE.WebGLRenderer({ canvas: bgCv, alpha: true, antialias: true });
        rdr.setPixelRatio(Math.min(devicePixelRatio, 2));
        rdr.setClearColor(0x000000, 0);
        rdr.setSize(window.innerWidth, window.innerHeight);

        var sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, .1, 1000);
        cam.position.z = 28;

        // Particles
        var N = 4500, pg = new THREE.BufferGeometry();
        var pp2 = new Float32Array(N * 3), pc = new Float32Array(N * 3);
        var pal = [[.2, .1, .8], [.05, .4, .6], [.4, .1, .7], [.8, .4, .0], [.1, .5, .3], [.8, .2, .4]];
        for (var i = 0; i < N; i++) {
          var i3 = i * 3, c2 = pal[Math.floor(Math.random() * pal.length)];
          pp2[i3] = (Math.random() - .5) * 130; pp2[i3 + 1] = (Math.random() - .5) * 90; pp2[i3 + 2] = (Math.random() - .5) * 70 - 10;
          pc[i3] = c2[0]; pc[i3 + 1] = c2[1]; pc[i3 + 2] = c2[2];
        }
        pg.setAttribute('position', new THREE.BufferAttribute(pp2, 3));
        pg.setAttribute('color', new THREE.BufferAttribute(pc, 3));
        var pm = new THREE.PointsMaterial({ size: .14, vertexColors: true, transparent: true, opacity: .5, sizeAttenuation: true, blending: THREE.NormalBlending, depthWrite: false });
        var parts = new THREE.Points(pg, pm); sc.add(parts);

        var dLight = new THREE.DirectionalLight(0xffffff, 1); dLight.position.set(5, 5, 5); sc.add(dLight);
        var aLight = new THREE.AmbientLight(0x404040, 2); sc.add(aLight);

        var sy = 0;
        var emRocket = document.getElementById('em-rocket');
        window.addEventListener('scroll', () => {
          sy = window.scrollY;
          if (emRocket) {
            var scrollFrac = sy / Math.max(1, document.body.scrollHeight - window.innerHeight);
            var transX = scrollFrac * (window.innerWidth - 200);
            var transY = scrollFrac * -(window.innerHeight - 200);
            emRocket.style.transform = `translate(${transX}px, ${transY}px)`;
          }
        });
        var t = 0;

        function animate() {
          requestAnimationFrame(animate); t += .005;



          var sf = sy / Math.max(1, document.body.scrollHeight);
          parts.rotation.y = t * .04 + sf * 2.2;
          parts.position.y = -sf * 18;



          cam.position.z = 28 - sf * 6; cam.lookAt(0, 0, 0);
          rdr.render(sc, cam);
        }
        animate();
      }
    };

    const timer = setTimeout(loadScript, 500);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove('legacy-active');
      window._threeInited = false;
      if (styleEl && styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
      }
    };
  }, []);

  const legacyHTML = `
<canvas id="bg"></canvas>

<div id="app" class="legacy-root">
<nav>
  <div class="logo">DevpathAI</div>
  <div class="nav-links">
    <a onclick="s2('features')">Features</a>
    <a onclick="s2('how-s')">How it works</a>
    <a onclick="s2('github-s')">Get Started</a>
  </div>
  <div class="nav-auth">
    <button class="btn-nav-ghost" onclick="doLogout()">Logout</button>
  </div>
</nav>

<section id="hero">
  <div class="badge"><span class="bdot"></span>GitHub-Connected &#183; AI Roadmap &#183; Week-by-Week</div>
  <h1 class="htitle">Your career path,<br/><span class="gtext">engineered by AI.</span></h1>
  <p class="hsub">Connect your GitHub, set your target role &#8212; get a precise week-by-week 6-month roadmap with skill gap analysis that adapts as you grow.</p>
  <div class="hacts">
    <button class="btn-p" onclick="s2('github-s')">Connect GitHub &amp; Start &#8594;</button>
    <button class="btn-g" onclick="s2('how-s')">See how it works</button>
  </div>
  <div class="hstats">
    <div><div class="sn">26</div><div class="sl">Weeks Mapped</div></div>
    <div><div class="sn">AI</div><div class="sl">Skill Analysis</div></div>
    <div><div class="sn">&#8734;</div><div class="sl">Adapts to You</div></div>
  </div>
  <div class="scroll-h"><div class="sh-lbl">Scroll to explore</div><div class="sh-line"></div></div>
</section>

<div class="moti" id="m1"><div class="mq">Every expert was once a<br/><span>complete beginner.</span></div><p class="mp">The only difference? They had a plan. Now you do too.</p></div>

<div class="sw" id="features">
  <div class="stag">Why DevpathAI</div>
  <h2 class="stitle">Built for students who<br/>mean business.</h2>
  <p class="ssub">Not a quiz. A full intelligence system that reads your GitHub and crafts your personal roadmap.</p>
  <div class="fgrid">
    <div class="fcard"><div class="fico" style="background:rgba(124,111,255,.12)">&#128025;</div><div class="ftitle">GitHub Profile Analysis</div><p class="fdesc">We read your repos, languages, commit history to understand what you already know &#8212; no manual input needed.</p></div>
    <div class="fcard"><div class="fico" style="background:rgba(34,211,238,.12)">&#128197;</div><div class="ftitle">Week-by-Week Roadmap</div><p class="fdesc">A precise 26-week plan with specific tasks, resources and mini-projects. Never wonder what to do next.</p></div>
    <div class="fcard"><div class="fico" style="background:rgba(74,222,128,.12)">&#128202;</div><div class="ftitle">Skill Gap Analysis</div><p class="fdesc">See exactly which skills you need, how far you are, and the fastest action to close every gap.</p></div>
    <div class="fcard"><div class="fico" style="background:rgba(244,114,182,.12)">&#128260;</div><div class="ftitle">Dynamic Adaptation</div><p class="fdesc">Mark weeks complete and the plan reshapes around your actual progress automatically.</p></div>
    <div class="fcard"><div class="fico" style="background:rgba(251,191,36,.12)">&#128161;</div><div class="ftitle">Portfolio Project Ideas</div><p class="fdesc">Every phase includes real project ideas matched to your target role &#8212; learn and build proof simultaneously.</p></div>
    <div class="fcard"><div class="fico" style="background:rgba(192,132,252,.12)">&#127919;</div><div class="ftitle">Role-Specific Targeting</div><p class="fdesc">From "Backend Dev at a startup" to "ML at FAANG" &#8212; specificity makes your plan life-changing.</p></div>
  </div>
</div>

<div class="sw" id="how-s" style="padding-top:2rem">
  <div class="stag">Process</div>
  <h2 class="stitle">From zero to hired<br/>in 6 months.</h2>
  <p class="ssub">Four simple steps, one powerful outcome.</p>
  <div class="sgrid">
    <div class="scard"><div class="snum">01</div><div class="sico">&#128025;</div><h3>Connect GitHub</h3><p>Link your profile &#8212; we analyze repos, languages and history instantly.</p></div>
    <div class="scard"><div class="snum">02</div><div class="sico">&#127919;</div><h3>Set Target Role</h3><p>Tell us your dream job &#8212; "Backend Dev at a startup", "Data Scientist at Google".</p></div>
    <div class="scard"><div class="snum">03</div><div class="sico">&#129504;</div><h3>AI Builds Your Plan</h3><p>Claude analyzes your gap and generates a week-by-week 6-month roadmap.</p></div>
    <div class="scard"><div class="snum">04</div><div class="sico">&#128200;</div><h3>Track &amp; Adapt</h3><p>Mark weeks done &#8212; the plan adapts to your real progress in real time.</p></div>
  </div>
</div>

<div class="moti" id="m2" style="padding-bottom:2rem"><div class="mq">Your GitHub is your<br/><span>silent resume.</span></div><p class="mp">Let's make it speak louder than anyone else's interview prep sheet.</p></div>

<div id="github-s">
  <div class="ghcard" id="ghc">
    <div style="font-size:3.5rem;margin-bottom:1.2rem">&#128025;</div>
    <h2>Connect Your GitHub</h2>
    <p>Enter your username &#8212; our backend analyzes your languages, repos and skills instantly.</p>
    <div class="ghr">
      <input type="text" class="ghi" id="ghu" placeholder="your-github-username"/>
      <button class="btn-conn" onclick="loadGH()">Analyze Profile &#8594;</button>
    </div>
    <div id="ghp"></div>
  </div>
</div>

<div id="form-s" style="margin-top:3rem">
  <div class="fwrap" id="fw">
    <div style="margin-bottom:1.5rem">
      <div style="font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:700;margin-bottom:.3rem">Build Your Roadmap</div>
      <p style="color:var(--text2);font-size:.9rem;font-weight:300">Complete all sections &#8212; more detail means a more powerful AI plan.</p>
    </div>
    <div class="sbar">
      <div class="spill act" id="p1" onclick="gostep(1)">1 &#183; Background</div>
      <div class="spill" id="p2" onclick="gostep(2)">2 &#183; Skills</div>
      <div class="spill" id="p3" onclick="gostep(3)">3 &#183; Target Role</div>
      <div class="spill" id="p4" onclick="gostep(4)">4 &#183; Personality</div>
    </div>
    <div class="fpg act" id="fp1">
      <div class="fgd">
        <div class="fl full"><label>Full Name</label><input type="text" id="fn" placeholder="Your name"/></div>
        <div class="fl"><label>Education Level</label><select id="fe"><option value="">Select</option><option>High School</option><option>Undergraduate</option><option>Postgraduate / PhD</option><option>Graduated / Working</option></select></div>
        <div class="fl"><label>College / University</label><input type="text" id="fc" placeholder="Institution name"/></div>
      </div>
      <div class="fnav"><span></span><button class="btn-nx" onclick="nxt(1)">Next &#8594;</button></div>
    </div>
    <div class="fpg" id="fp2">
      <div class="fgd">
        <div class="fl full"><label>Technical Skills (select all that apply)</label>
          <div class="stw" id="tsk">
            <div class="stag2" onclick="tog(this)">Python</div><div class="stag2" onclick="tog(this)">JavaScript</div><div class="stag2" onclick="tog(this)">TypeScript</div><div class="stag2" onclick="tog(this)">Java</div><div class="stag2" onclick="tog(this)">C/C++</div><div class="stag2" onclick="tog(this)">Go</div><div class="stag2" onclick="tog(this)">Rust</div><div class="stag2" onclick="tog(this)">React</div><div class="stag2" onclick="tog(this)">Node.js</div><div class="stag2" onclick="tog(this)">Express</div><div class="stag2" onclick="tog(this)">FastAPI</div><div class="stag2" onclick="tog(this)">Django</div><div class="stag2" onclick="tog(this)">SQL</div><div class="stag2" onclick="tog(this)">MongoDB</div><div class="stag2" onclick="tog(this)">PostgreSQL</div><div class="stag2" onclick="tog(this)">Redis</div><div class="stag2" onclick="tog(this)">Docker</div><div class="stag2" onclick="tog(this)">Kubernetes</div><div class="stag2" onclick="tog(this)">AWS</div><div class="stag2" onclick="tog(this)">GCP</div><div class="stag2" onclick="tog(this)">Machine Learning</div><div class="stag2" onclick="tog(this)">Deep Learning</div><div class="stag2" onclick="tog(this)">LLMs / AI</div><div class="stag2" onclick="tog(this)">Git / GitHub</div><div class="stag2" onclick="tog(this)">Linux</div><div class="stag2" onclick="tog(this)">UI/UX Design</div><div class="stag2" onclick="tog(this)">Cybersecurity</div><div class="stag2" onclick="tog(this)">Data Analysis</div>
          </div>
        </div>
      </div>
      <div class="fnav"><button class="btn-bk" onclick="prv(2)">&#8592;</button><button class="btn-nx" onclick="nxt(2)">Next &#8594;</button></div>
    </div>
    <div class="fpg" id="fp3">
      <div class="fgd">
        <div class="fl full"><label>&#127919; Target Role &#8212; be specific!</label><input type="text" id="fro" placeholder="e.g. Backend Developer at a startup, ML Engineer"/></div>
        <div class="fl full"><label>Biggest obstacle right now</label><textarea id="fob" placeholder="e.g. Weak DSA, no real projects, tier-3 college..."></textarea></div>
        <div class="fl"><label>Timeline</label><select id="ftl"><option value="">Select</option><option>3 months</option><option>6 months</option><option>1+ year</option></select></div>
        <div class="fl"><label>Target location/domain</label><select id="fl2"><option value="">Select</option><option>Startup</option><option>MNC / Big Tech</option><option>Remote / Global</option></select></div>
      </div>
      <div class="fnav"><button class="btn-bk" onclick="prv(3)">&#8592;</button><button class="btn-nx" onclick="nxt(3)">Next &#8594;</button></div>
    </div>
    <div class="fpg" id="fp4">
      <div class="fgd">
        <div class="fl"><label>Learning style</label><select id="fls"><option value="">Select</option><option>Video courses</option><option>Reading docs / books</option><option>Building projects</option><option>Mix of everything</option></select></div>
        <div class="fl"><label>Consistency level</label><select id="fco"><option value="">Select</option><option>Highly consistent</option><option>Moderate</option><option>Inconsistent</option></select></div>
        <div class="fl full"><label>Anything else the AI should know?</label><textarea id="fex" rows="3" placeholder="Side projects, open source, internships, special context..."></textarea></div>
      </div>
      <div class="fnav">
        <button class="btn-bk" onclick="prv(4)">&#8592;</button>
        <button class="btn-an" id="ab" onclick="runAI()">&#128640; Generate My 6-Month Roadmap</button>
      </div>
    </div>
  </div>
</div>

<div id="res-s">
  <div class="rcard">
    <div class="rheader"><div><h2 id="rn">Your Career Roadmap</h2><p id="rsub">AI-Generated 6-Month Plan</p></div><div style="font-size:2.5rem">&#127919;</div></div>
    <div class="rbody" id="rb"></div>
  </div>
</div>

<footer><div class="flogo">DevpathAI</div><p>AI career intelligence &#183; GitHub-connected &#183; Protected Route</p></footer>
<div id="em-rocket" style="position:fixed; z-index:-1; font-size:18rem; pointer-events:none; left: -100px; bottom: -100px; transition: transform 0.1s linear; opacity: 0.8;">🚀</div>
</div>
  `;

  return <div dangerouslySetInnerHTML={{ __html: legacyHTML }} />;
}
