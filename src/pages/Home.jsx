import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { engines, faqs, journey, moments, pains, quotes, scores, sentences, skills, stages } from "../data.js";

const APP = "https://app.saleplay.co";
const DEMO = "https://saleplay.zohobookings.in/portal-embed#/277490000000040050";
const waveHeights = Array.from({ length: 12 }, (_, i) => `${30 + ((i * 17) % 70)}%`);
const chartHeights = [30, 45, 38, 62, 55, 78, 70];

function StageIcon({ name }) {
  const props = { viewBox: "0 0 24 24", "aria-hidden": "true" };
  if (name === "Awareness") {
    return <svg {...props}><path d="M12 2.8 13.6 9 19.8 10.6 13.6 12.2 12 18.4 10.4 12.2 4.2 10.6 10.4 9Z" /></svg>;
  }
  if (name === "Interest") {
    return <svg {...props}><path d="M5 6.2h10.2a2 2 0 0 1 2 2V13a2 2 0 0 1-2 2H9.2L6 17.6V15H5a2 2 0 0 1-2-2V8.2a2 2 0 0 1 2-2Z" /></svg>;
  }
  if (name === "Evaluation") {
    return <svg {...props}><circle cx="10.4" cy="10.4" r="5.2" /><path d="m14.2 14.2 5 5" /></svg>;
  }
  if (name === "Negotiation") {
    return <svg {...props}><circle cx="12" cy="12" r="8" /><path d="m15.2 8.8-1.5 5-5 1.5 1.5-5Z" /></svg>;
  }
  if (name === "Closing") {
    return <svg {...props}><path d="M6.5 20V4.5M6.5 5.2h11l-2.4 3.4 2.4 3.4h-11" /></svg>;
  }
  return <svg {...props}><path d="M12 20.2V11" /><path d="M12 14.2C8.2 14.2 6 12 6 8.8c3.2.2 6 2.1 6 5.4Z" /><path d="M12 12.4c3.4 0 5.2-1.8 5.6-4.6-3 .2-5.6 1.8-5.6 4.6Z" /></svg>;
}

export default function Home() {
  const [typed, setTyped] = useState("");
  const [stageIndex, setStageIndex] = useState(0);
  const [level, setLevel] = useState("BEG");
  const [skillIndex, setSkillIndex] = useState(0);
  const [dot, setDot] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [showAllFaq, setShowAllFaq] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    document.title = "SalePlay | AI Sales Roleplay & Sales Training Software";
  }, []);

  useEffect(() => {
    let sentence = 0;
    let index = 0;
    let deleting = false;
    let timer = 0;
    const tick = () => {
      const text = sentences[sentence];
      if (!deleting) {
        index += 1;
        setTyped(text.slice(0, index));
        if (index === text.length) {
          deleting = true;
          timer = window.setTimeout(tick, 2200);
          return;
        }
        timer = window.setTimeout(tick, 26);
      } else {
        index -= 1;
        setTyped(text.slice(0, index));
        if (index === 0) {
          deleting = false;
          sentence = (sentence + 1) % sentences.length;
          timer = window.setTimeout(tick, 400);
          return;
        }
        timer = window.setTimeout(tick, 12);
      }
    };
    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setStageIndex((n) => (n + 1) % stages.length), 2800);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setSkillIndex((n) => (n + 1) % skills.length), 2500);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;
    const cards = [...scroller.querySelectorAll(".engine")];
    const sync = () => {
      const mid = scroller.scrollLeft + scroller.clientWidth / 2;
      let active = 0;
      cards.forEach((card, i) => {
        const center = card.offsetLeft + card.offsetWidth / 2;
        const best = cards[active].offsetLeft + cards[active].offsetWidth / 2;
        if (Math.abs(center - mid) < Math.abs(best - mid)) active = i;
      });
      setDot(active);
    };
    scroller.addEventListener("scroll", sync, { passive: true });
    return () => scroller.removeEventListener("scroll", sync);
  }, []);

  const skill = skills[skillIndex];

  return (
    <main>
      <section className="hero">
        <video
          className="hero-bg"
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          src="/assets/hero-bg.mp4"
        />
        <div className="hero-shade" />
        <div className="rings" />
        <div className="wrap hero-grid">
          <div>
            <h1>Train your entire sales team. <span>From Day 1 to top performer.</span></h1>
            <p className="typer"><span>{typed}</span><span className="caret" /></p>
            <div className="hero-actions">
              <a className="btn btn-trial" href={APP} target="_blank" rel="noopener noreferrer">Start Free Trial →</a>
              <a className="btn btn-ghost" href={DEMO} target="_blank" rel="noopener noreferrer">Book a Demo</a>
            </div>
            <Link className="pilot" to="/pilot">For teams: Explore our 30-day Pilot Program →</Link>
          </div>
          <div className="hero-visual">
            <div className="stat a"><i>↗</i><div><strong>40%</strong><span>Faster ramp time</span></div></div>
            <div className="stat b"><i>☺</i><div><strong>100+</strong><span>Reps trained</span></div></div>
            <div className="stat c"><i>3×</i><div><strong>3x</strong><span>More practice reps</span></div></div>
          </div>
        </div>
        <div className="wrap mobile-stats"><span>40% faster</span><span>100+ reps</span><span>3x practice</span></div>
      </section>

      <section className="problem">
        <div className="wrap problem-grid">
          <div className="sticky-copy">
            <h2>Your reps freeze when <span className="rose">customers push back.</span></h2>
            <p className="lede">They know the playbook. They've read the scripts. But when a customer says "your competitor is cheaper" or "I need to think about it" they hesitate. That hesitation costs you deals.</p>
            <p className="sublede">The gap isn't knowledge. It's execution under pressure.</p>
          </div>
          <div className="stack">
            {pains.map(([tone, emoji, title, body]) => (
              <article className="pain" key={title}>
                <div className={`pain-card ${tone}`}><div className="emoji">{emoji}</div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mastery">
        <div className="wrap mastery-head">
          <div>
            <h2>The Mastery <br /><span className="ghost">Engine.</span></h2>
            <p className="lede">Confidence isn’t built in training. It’s built under pressure.</p>
          </div>
          <div className="dots">
            {engines.map((card, i) => (
              <button key={card.tag} type="button" className={i === dot ? "on" : ""} aria-label={`Card ${i + 1}`} onClick={() => scrollerRef.current?.querySelectorAll(".engine")[i]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })} />
            ))}
          </div>
        </div>
        <div className="scroller" ref={scrollerRef}>
          {engines.map((card) => (
            <article className="engine" key={card.tag}>
              <div className={`tag ${card.tone}`}>{card.tag}</div>
              <h3>{card.title}</h3>
              <p>{card.body}<span className={card.tone}>{card.accent}</span>.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="proof" id="social-proof">
        <div className="wrap">
          <div className="center">
            <p className="kicker">Trusted by fast-growing sales teams</p>
            <div className="logos"><span>TamilPreneur</span><span>Kriha IT Solutions</span><span>WowXplore</span></div>
          </div>
          <div className="quotes">
            {quotes.map(([initial, name, role, text]) => (
              <article className="quote" key={name}>
                <div className="qmark">"</div>
                <p>{text}</p>
                <div className="who"><div className="avatar">{initial}</div><div><strong>{name}</strong><br /><small>{role}</small></div></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="wrap center">
          <p className="kicker">Product</p>
          <h2>Everything you need to <span className="grad">unlock revenue.</span></h2>
          <p className="intro">A complete ecosystem driven by AI, designed to turn every rep into your best performer.</p>
          <div className="bento">
            <div className="col">
              <article className="feat"><div className="ico">🎙</div><h3>Simulate Reality</h3><p>Practice realistic sales conversations with our advanced AI that understands context, tone, and specific objections.</p><div className="viz bars">{waveHeights.map((height, i) => <span key={`${height}-${i}`} style={{ height, animationDelay: `${i * 0.08}s` }} />)}</div></article>
              <article className="feat"><div className="ico">👥</div><h3>Scalable Training</h3><p>Train hundreds of reps simultaneously without hiring more managers. Standardize excellence across your org.</p><div className="viz faces"><span /><span /><span /><b>+99</b></div></article>
            </div>
            <div className="col">
              <article className="feat"><div className="ico">⚡</div><h3>Real-time Coaching</h3><p>Get instant guidance on your pitch, pacing, and keyword usage while you're still in the conversation.</p><div className="viz mini-row"><span className="ping" /><div className="lines"><i style={{ width: 96 }} /><i style={{ width: 64 }} /></div></div></article>
              <article className="feat"><div className="ico">📊</div><h3>Performance Analytics</h3><p>Track improvement over time with detailed dashboards measuring win rates, objection handling, and more.</p><div className="viz chart">{chartHeights.map((height) => <span key={height} style={{ height: `${height}%` }} />)}</div></article>
            </div>
            <div className="col">
              <article className="feat"><div className="ico">◎</div><h3>Custom Scenarios</h3><p>Create roleplay scenarios tailored to your specific products, buyer personas, and market challenges.</p><div className="viz"><div className="orbit"><span><b /></span></div></div></article>
              <article className="feat"><div className="ico">💬</div><h3>Objection Handling</h3><p>Master the art of overcoming common sales objections through repetitive, low-stakes practice.</p><div className="viz bubbles"><div className="bubble"><i /><i style={{ width: 40 }} /></div><div className="bubble me"><i style={{ width: 80 }} /><i style={{ width: 48 }} /></div></div></article>
            </div>
          </div>
        </div>
      </section>

      <section className="journey">
        <div className="wrap">
          <div className="journey-top">
            <div>
              <div className="eyebrow">Multi-Level Training</div>
              <h2 className="display">Master <b>Complete</b> Journeys</h2>
            </div>
            <div>
              <p className="lede">Enterprise deals span 5-12 touchpoints. Practice them all with AI that remembers every conversation, objection, and commitment.</p>
              <div className="metrics"><div><strong>10+</strong><span>Calls</span></div><div className="sep" /><div><strong>6</strong><span>Stages</span></div><div className="sep" /><div><strong>∞</strong><span>Memory</span></div></div>
            </div>
          </div>
          <div className="stages">
            {journey.map(([, name, verb]) => <div className="stage" key={name}><div className="num"><StageIcon name={name} /></div><strong>{name}</strong><br /><em>{verb}</em></div>)}
          </div>
        </div>
        <div className="memory">
          <video
            className="hero-bg"
            aria-hidden="true"
            autoPlay
            muted
            loop
            playsInline
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4"
          />
          <div className="memory-shade" />
          <div className="wrap">
            <h3>AI That <b>Remembers</b></h3>
            <p className="lede">Your AI buyer maintains complete conversation history—pricing discussions, objections raised, commitments made. Every call builds on the last.</p>
            <div className="memos">
              <div className="memo">"Last week you mentioned needing ROI proof for the CFO. I've prepared a custom business case..."<small>Call 4 → remembers Call 2</small></div>
              <div className="memo">"You quoted 15% discount last month. Has anything changed on your end?"<small>Call 6 → remembers Call 4</small></div>
              <div className="memo">"Your competitor concern from the demo—we now have three customers who switched from them."<small>Call 5 → remembers Call 3</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="coach">
        <div className="wrap">
          <div className="live-head">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}><span className="pulse-dot" /><span className="mono" style={{ color: "#fff", letterSpacing: ".16em" }}>SYSTEM ACTIVE</span></div>
          </div>
          <h2><span className="slash">//</span> Live <b>Coaching</b></h2>
          <p className="note">Real-time guidance system. AI monitors your practice and provides tactical feedback.</p>
          <div className="coach-grid">
            <div>
              <div className="radar-wrap">
                <div className="ring" style={{ width: "33%", height: "33%" }} />
                <div className="ring" style={{ width: "66%", height: "66%" }} />
                <div className="ring" style={{ width: "100%", height: "100%" }} />
                <div className="cross-h" /><div className="cross-v" /><div className="sweep" /><div className="core" />
                {stages.map((stage, i) => {
                  const rad = ((i * 45 - 90) * Math.PI) / 180;
                  return <button key={stage.name} type="button" className={`stage-btn${i === stageIndex ? " on" : ""}`} style={{ left: `calc(50% + ${Math.cos(rad) * 140}px)`, top: `calc(50% + ${Math.sin(rad) * 140}px)` }} onClick={() => setStageIndex(i)}>{i + 1}</button>;
                })}
              </div>
              <div className="stage-label"><strong>{stages[stageIndex].name}</strong><span>{stages[stageIndex].objective}</span></div>
            </div>
            <div className="panel">
              <span className="corner tl" /><span className="corner tr" /><span className="corner bl" /><span className="corner br" />
              <div className="panel-h"><span>COACH_PANEL_v2.1</span><span className="monitor">● MONITORING</span></div>
              <div className="panel-b">
                <div><div className="lbl">MISSION OBJECTIVE</div><p className="mission">Earn attention, create relevance, open conversation</p></div>
                <div>
                  <div className="lbl">ASSIST LEVEL</div>
                  <div className="levels">{["BEG", "INT", "ADV"].map((item) => <button key={item} type="button" className={level === item ? "on" : ""} onClick={() => setLevel(item)}>{item}</button>)}</div>
                </div>
                <div className="meter"><header><span>PROGRESSION</span><span style={{ color: "#fff" }}>45%</span></header><div className="track emerald"><span style={{ width: "45%" }} /></div></div>
                <div className="meter"><header><span>URGENCY</span><span style={{ color: "#fff" }}>60%</span></header><div className="track amber"><span style={{ width: "60%" }} /></div></div>
                <div className="meter"><header><span>CONFIDENCE</span><span style={{ color: "#fff" }}>72%</span></header><div className="track cyan"><span style={{ width: "72%" }} /></div></div>
                <div className="tip"><small>INCOMING TIP</small><p>Ask permission before presenting value proposition</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="drills">
        <video
          className="hero-bg"
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          src="https://d8j0ntlcm91z4.cloudfront.net/user_3GJaYKPxdnQG0Q9O26lu6DPmcHu/hf_20260805_192612_e00017a8-56b0-4957-935b-9ffd87663994.mp4"
        />
        <div className="drills-shade" />
        <div className="wrap drills-grid">
          <div>
            <p className="kicker">Micro Drills</p>
            <h2>15 Skills. <b>2 Minutes Each.</b></h2>
            <p className="lede">Focused practice between meetings. Target specific weaknesses with real-time coaching feedback.</p>
            <div className="drill-card">
              <h3 style={{ margin: 0 }}>{skill.name}</h3>
              <p style={{ margin: "6px 0 0", color: "#fff" }}>{skill.tip}</p>
              <div className="drill-stats"><div><strong>2:00</strong><span>DURATION</span></div><div><strong>3</strong><span>TO MASTER</span></div><div><strong>4.0</strong><span>PASS SCORE</span></div></div>
            </div>
            <a className="btn btn-drill" href={APP} target="_blank" rel="noopener noreferrer">Start Drilling →</a>
            <div className="skill-pills">{skills.map((item, i) => <button key={item.name} type="button" className={i === skillIndex ? "on" : ""} onClick={() => setSkillIndex(i)}>{i + 1}</button>)}</div>
          </div>
          <div className="wheel">
            <div className="wheel-ring" /><div className="wheel-dash" /><div className="wheel-core">{skill.name}</div>
            {skills.map((item, i) => {
              const ang = (i * (360 / skills.length) - 90) * Math.PI / 180;
              return <button key={item.name} type="button" className={`skill-btn${i === skillIndex ? " on" : ""}`} aria-label={item.name} style={{ left: `calc(50% + ${Math.cos(ang) * 38}%)`, top: `calc(50% + ${Math.sin(ang) * 38}%)` }} onClick={() => setSkillIndex(i)} />;
            })}
          </div>
        </div>
      </section>

      <section className="assess">
        <div className="wrap">
          <p className="kicker">Assessment Mode</p>
          <h2>Measure <b>Real Learning.</b></h2>
          <p className="lede">Baseline assessments before training. Trap questions after. See exactly what stuck.</p>
          <div className="score-grid">
            <div className="score-hero">
              <div className="after">After Training<div><span className="big">83</span> %</div><small>Final Score</small></div>
              <div className="before">Before Training<div><span className="big dim">26</span> %</div><small style={{ color: "#fff" }}>Baseline Score</small></div>
            </div>
            <div className="skill-list">
              {scores.map(([score, name, base, delta, growth]) => (
                <div className="skill-row" key={name}>
                  <div className="donut" style={{ "--p": score }}><span>{score}</span></div>
                  <div><strong>{name}</strong><div><span className="base">{base}</span> <span className="delta">{delta}</span> {growth && <span className="growth">{growth}</span>}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ranks">
        <div className="wrap">
          <h2>Rise Through <b>the Ranks.</b></h2>
          <p className="lede" style={{ margin: "0 auto" }}>See who's putting in the reps — and who's coasting.</p>
          <div className="rank-grid">
            <div className="rank-card">
              <div className="ring-xp"><div><strong>8</strong><span>Rainmaker</span></div></div>
              <div className="xp-num">12,450 <small>XP</small><div className="to-next">3,550 XP to Strategist</div></div>
              <div className="levels-list">
                <div className="lvl"><span>7 Advisor</span><span>9,000 XP</span></div>
                <div className="lvl on"><span>8 Rainmaker</span><span>12,000 XP</span></div>
                <div className="lvl"><span>9 Strategist</span><span>16,000 XP</span></div>
                <div className="lvl"><span>10 Sales Legend</span><span>20,000 XP</span></div>
              </div>
            </div>
            <div>
              <div className="ach">
                <div className="ach-head"><h3>Achievements</h3><span style={{ color: "#fff" }}>3 of 24 earned</span></div>
                <div className="badge-grid">
                  <div className="badge"><div className="ic">❄</div><div><h4>Cold Open</h4><p>Survive your first roleplay</p></div><span className="dot-earned" /></div>
                  <div className="badge"><div className="ic">🔥</div><div><h4>Streak Machine</h4><p>7 days. No excuses.</p></div><span className="dot-earned" /></div>
                  <div className="badge"><div className="ic">🛡</div><div><h4>Pushback Proof</h4><p>50 objections handled</p></div><span className="dot-earned" /></div>
                  <div className="badge locked"><div className="ic">🏆</div><div><h4>Leaderboard Threat</h4><p>Crack the top 3</p></div></div>
                </div>
              </div>
              <div className="board">
                <div className="board-head"><h3>Who's Putting in the Work</h3><span style={{ color: "#fff" }}>This Week</span></div>
                <div className="rowp"><span className="n">1</span><span className="av">SM</span><span>Sarah M.</span><b>18,420 XP</b></div>
                <div className="rowp"><span className="n">2</span><span className="av">JK</span><span>James K.</span><b>15,890 XP</b></div>
                <div className="rowp you"><span className="n">3</span><span className="av">ME</span><span>You</span><b>12,450 XP</b></div>
                <p className="climb">Climbed 2 spots this week · 47 team members</p>
                <a className="btn btn-xp" href={APP} target="_blank" rel="noopener noreferrer">Start Earning XP</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="moments">
        <div className="wrap" style={{ marginBottom: 28 }}>
          <p className="kicker">Designed for your day</p>
          <h2 style={{ fontSize: "clamp(2.2rem,4vw,3.4rem)", letterSpacing: "-.03em", margin: "8px 0" }}>Built for every moment that <span className="accent">matters.</span></h2>
          <p className="lede">From the first sentence to the final close, SalePlay helps reps stay calm, clear, and consistent across every scenario.</p>
        </div>
        <div className="marquee">{moments.concat(moments).map(([icon, title, copy], i) => <article className="moment" key={`${title}-${i}`}><div>{icon}</div><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="beyond">
        <div className="wrap">
          <p className="kicker">Beyond Sales</p>
          <h2>Customer empathy, <b>company-wide.</b></h2>
          <p className="lede">SalePlay isn't just for Sales. Every team that influences revenue needs to understand the customer.</p>
          <div className="teams">
            <article className="team"><span>Product Teams</span><h3>Build what customers will actually buy.</h3><p>Test feature ideas against skeptical AI buyers. Validate your roadmap before writing a single line of code.</p></article>
            <article className="team"><span>Marketing Teams</span><h3>Write copy that converts.</h3><p>Practice objection handling to refine messaging. Know what resonates before you ship.</p></article>
            <article className="team"><span>Support Teams</span><h3>Defuse before it escalates.</h3><p>Roleplay tense customer scenarios. Build confidence handling difficult conversations.</p></article>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="wrap">
          <p className="kicker">Brand and platform</p>
          <h2>What is <span className="accent">SalePlay?</span></h2>
          <p>SalePlay is AI sales roleplay software and a sales training platform from Nunmai Technologies Private Limited. It helps sales teams practice realistic discovery calls, objection handling, pricing conversations, negotiation, and follow-up before they speak with real customers.</p>
          <p>Unlike passive sales courses or call recording tools, SalePlay focuses on active practice. Reps speak with voice-based AI buyers, face real pushback, receive coaching feedback, and build the confidence needed for high-stakes B2B sales conversations.</p>
        </div>
      </section>

      <section className="faq" id="faq">
        <div className="wrap center">
          <p className="kicker">FAQ</p>
          <h2>Answers, kept simple.</h2>
          <p className="intro">Short, clear answers to the questions teams ask before they start.</p>
          <div className="faq-list">
            {faqs.map(([question, answer], i) => (
              <div key={question} className={`faq-item${i >= 8 ? " hidden-q" : ""}${i >= 8 && showAllFaq ? " show" : ""}${openFaq === i ? " open" : ""}`}>
                <button type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}><span>{question}</span><span className="plus">{openFaq === i ? "–" : "+"}</span></button>
                <div className="a">{answer}</div>
              </div>
            ))}
          </div>
          <button className="more-btn" type="button" onClick={() => setShowAllFaq((v) => !v)}>{showAllFaq ? "Show fewer questions" : "Show 14 more questions"}</button>
        </div>
      </section>

      <section className="cta">
        <video
          className="hero-bg"
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4"
        />
        <div className="cta-shade" />
        <div className="wrap">
          <h2>Stop Leaving <span className="accent">Revenue</span> to Chance.</h2>
          <p>Build a team that is ready for discovery calls, objections, demos, pricing pressure, and closing conversations from Day 1.</p>
          <a className="btn btn-trial" href={APP} target="_blank" rel="noopener noreferrer">Start Your Battle Now</a>
        </div>
      </section>
    </main>
  );
}
