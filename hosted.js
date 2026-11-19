/* Connects the timetable to Firebase when it is served from GitHub Pages (index.html loads this; the copy inside Claude does not).
   Facilitators only read: they never sign in. Hosts sign in with the host passcode (the same host account as the proposals
   page) from DeliberAIde links → Edit links, and can then change links, who's where, and any wording with Edit text.
   Reading never depends on sign-in, so the page still works inside the Webflow frame where a browser may block sign-in storage. */
(function(){
  var HOST='host@houseofthepeople.uk', C=window.FIREBASE_CONFIG;
  function fail(e){console.error('[timetable]',e);window.TIMETABLE_BACKEND={ready:Promise.reject(e),hostSignIn:function(){return Promise.resolve(false);}};window.TIMETABLE_BACKEND.ready.catch(function(){});}
  if(!(window.firebase&&firebase.firestore&&C&&C.projectId)){fail(new Error('Firebase did not load'));return;}
  var db,auth=null;
  try{ if(!firebase.apps.length)firebase.initializeApp(C); db=firebase.firestore(); }
  catch(e){ fail(e); return; }
  try{ auth=firebase.auth(); }catch(e){ console.warn('[timetable] sign-in unavailable here; reading only',e); auth=null; }
  var ready=new Promise(function(resolve){
    if(!auth){resolve({db:db,host:false});return;}
    var done=false;
    try{ auth.onAuthStateChanged(function(u){ if(!done){done=true;resolve({db:db,host:!!(u&&u.email===HOST)});} },function(){ if(!done){done=true;resolve({db:db,host:false});} }); }
    catch(e){ done=true; resolve({db:db,host:false}); }
    setTimeout(function(){ if(!done){done=true;resolve({db:db,host:false});} },4000);
  });
  window.TIMETABLE_BACKEND={
    ready:ready,
    hostSignIn:function(pass){ if(!auth)return Promise.resolve(false); return auth.signInWithEmailAndPassword(HOST,pass).then(function(){return true;},function(e){console.warn('[timetable] host sign-in failed',e);return false;}); },
    hostSignOut:function(){ return auth?auth.signOut():Promise.resolve(); }
  };
})();
