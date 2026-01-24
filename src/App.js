{/* MODAL */}
    {isModalOpen && (
         <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.9)', zIndex:100, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px'}}>
             <div style={{background:'#0f172a', padding:'32px', borderRadius:'24px', width:'100%', maxWidth:'450px', border:'1px solid rgba(255,255,255,0.1)', position:'relative'}}>
                 <button onClick={closeModal} style={{position:'absolute', top:'20px', right:'20px', background:'none', border:'none', color:'white', cursor:'pointer'}}><X /></button>
                 {modalStep === 1 && (
                     <>
                         <h2 style={{marginTop:0, textTransform:'uppercase'}}>Fomu ya <span style={{color:'#a3e635'}}>Maombi</span></h2>
                         <p style={{color:'#94a3b8', fontSize:'14px'}}>Jaza taarifa sahihi.</p>
                         <input placeholder="Jina la Timu" value={teamData.name} onChange={e=>setTeamData({...teamData, name:e.target.value})} style={{width:'100%', padding:'14px', marginBottom:'12px', borderRadius:'8px', border:'1px solid #333', background:'black', color:'white'}} />
                         <input placeholder="Jina la Kocha" value={teamData.coachName} onChange={e=>setTeamData({...teamData, coachName:e.target.value})} style={{width:'100%', padding:'14px', marginBottom:'12px', borderRadius:'8px', border:'1px solid #333', background:'black', color:'white'}} />
                         <input placeholder="Namba ya Simu" value={teamData.phone} onChange={e=>setTeamData({...teamData, phone:e.target.value})} style={{width:'100%', padding:'14px', marginBottom:'24px', borderRadius:'8px', border:'1px solid #333', background:'black', color:'white'}} />
                         <button onClick={()=>setModalStep(2)} style={{...styles.buttonPrimary, width:'100%'}}>ENDELEA</button>
                     </>
                 )}
                 {modalStep === 2 && (
                     <div style={{textAlign:'center'}}>
                         <h2 style={{marginTop:0}}>Thibitisha</h2>
                         <div style={{background:'rgba(255,255,255,0.05)', padding:'20px', borderRadius:'16px', marginBottom:'20px'}}>
                             <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}><span style={{color:'#94a3b8'}}>Ada:</span> <b>{FEES.amount}</b></div>
                             <div style={{display:'flex', justifyContent:'space-between'}}><span style={{color:'#94a3b8'}}>Namba:</span> <b style={{color:'#a3e635'}}>{FEES.number}</b></div>
                         </div>
                         <div style={{display:'flex', alignItems:'center', gap:'10px', justifyContent:'center', marginBottom:'20px'}}>
                             <input type="checkbox" checked={teamData.termsAccepted} onChange={e=>setTeamData({...teamData, termsAccepted:e.target.checked})} />
                             <span style={{color:'#cbd5e1', fontSize:'13px'}}>Nakubaliana na Sheria na Masharti</span>
                         </div>
                         <button disabled={!teamData.termsAccepted} onClick={handleFinalSubmit} style={{...styles.buttonPrimary, width:'100%', background: teamData.termsAccepted?'#a3e635':'#333', color: teamData.termsAccepted?'black':'#666', cursor: teamData.termsAccepted?'pointer':'not-allowed'}}>WASILISHA</button>
                     </div>
                 )}
                 {modalStep === 3 && (
                     <div style={{textAlign:'center'}}>
                         <div style={{width:'60px', height:'60px', background:'rgba(34,197,94,0.1)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px'}}><Check color="#22c55e" /></div>
                         <h2>Imepokelewa!</h2>
                         <button onClick={closeModal} style={{color:'#a3e635', background:'none', border:'none', fontWeight:'bold', cursor:'pointer'}}>FUNGA</button>
                     </div>
                 )}
             </div>
         </div>
    )}

    {/* NEWS POPUP */}
    {selectedNews && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.95)', zIndex:110, padding:'20px', overflowY:'auto'}}>
            <button onClick={closeNews} style={{position:'fixed', top:'20px', right:'20px', background:'white', border:'none', borderRadius:'50%', width:'40px', height:'40px', zIndex:120, cursor:'pointer'}}><X color="black" /></button>
            <div style={{maxWidth:'600px', margin:'40px auto', color:'white'}}>
                <h1>{selectedNews.title}</h1>
                <img src={selectedNews.image} style={{width:'100%', borderRadius:'16px'}} alt={selectedNews.title} />
                <p style={{lineHeight:1.8, fontSize:'18px', marginTop:'24px', whiteSpace:'pre-wrap'}}>{selectedNews.body || selectedNews.excerpt}</p>
            </div>
        </div>
    )}

  </div>
</>