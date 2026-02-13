// #region agent log
var _dbg=(function(){
  var endpoint='http://127.0.0.1:7248/ingest/94fa9298-6a6f-4428-910d-9a0cfc8f7409';
  function send(id,loc,msg,data){ fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:loc,message:msg,data:data||{},timestamp:Date.now(),hypothesisId:id})}).catch(function(){}); }
  function run(){
    var html=document.documentElement, body=document.body, frame=document.getElementById('pdf-frame');
    var getCS=function(el){ return el&&window.getComputedStyle(el); };
    var csHtml=getCS(html), csBody=getCS(body), csFrame=frame?getCS(frame):null;
    var vw=window.innerWidth, vh=window.innerHeight;
    var viewportMeta=document.querySelector('meta[name=viewport]');
    send('A','app.js:layout','overflow and position',{htmlOverflow:csHtml?csHtml.overflow:null,bodyOverflow:csBody?csBody.overflow:null,bodyPosition:csBody?csBody.position:null,fixedBody:csBody&&csBody.position==='fixed'});
    send('B','app.js:view','FitH and viewport size',{hash:window.location.hash,innerWidth:vw,innerHeight:vh,isNarrow:vw<769});
    send('C','app.js:viewport-meta','viewport meta',{content:viewportMeta?viewportMeta.getAttribute('content'):null,innerWidth:vw});
    send('D','app.js:iframe-dim','iframe and touch',{frameW:frame?frame.clientWidth:0,frameH:frame?frame.clientHeight:0,touch:'ontouchstart' in window});
    send('E','app.js:mobile-height','mobile height',{innerWidth:vw,isMobileWidth:vw<769,frameHeight:frame?frame.clientHeight:0,bodyClientHeight:body?body.clientHeight:0,vh:vh});
  }
  return {send:send,run:run};
})();
function setPdfView() {
  var frame = document.getElementById('pdf-frame');
  if (!frame) return;
  var isMobile = window.innerWidth < 769;
  var needView = isMobile ? 'Fit' : 'FitH';
  var hash = frame.src.split('#')[1] || '';
  var currentView = (hash.replace('view=', '').split('&')[0]) || '';
  if (currentView !== needView) {
    frame.src = '/pdf#view=' + needView;
  }
}
setPdfView();
_dbg.run();
window.addEventListener('resize',function(){ setPdfView(); _dbg.run(); });
document.getElementById('pdf-frame').addEventListener('load',function(){ _dbg.run(); });
// #endregion
