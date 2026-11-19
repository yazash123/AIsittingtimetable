/* Connects the timetable to Firebase when it is served from GitHub Pages (index.html loads this; the copy inside Claude does not).
   Facilitators only read: they never sign in. Hosts sign in with the host passcode (the same host account as the proposals
   page) from DeliberAIde links → Edit links, and can then change links, who's where, and any wording with Edit text. */
(function(){
  var HOST='host@houseofthepeople.uk', C=window.FIREBASE_CONFIG;
  function fail(e){window.TIMETABLE_BACKEND={ready:Promise.reject(e)};window.TIMETABLE_BACKEND.ready.catch(function(){});}
  if(!(window.firebase&&firebase.auth&&firebase.firestore&&C&&C.projectId)){fail(new Error('Firebase did not load'));return;}
  var auth,db;
  try{ if(!firebase.apps.length)firebase.initializeApp(C); auth=firebase.auth(); db=firebase.firestore(); }
  catch(e){ console.error('[timetable] Firebase failed to start',e); fail(e); return; }
  var ready=new Promise(function(resolve){
    var done=false;
    auth.onAuthStateChanged(function(u){ if(!done){done=true;resolve({db:db,host:!!(u&&u.email===HOST)});} });
    setTimeout(function(){ if(!done){done=true;resolve({db:db,host:false});} },6000);
  });
  window.TIMETABLE_BACKEND={
    ready:ready,
    hostSignIn:function(pass){ return auth.signInWithEmailAndPassword(HOST,pass).then(function(){return true;},function(){return false;}); },
    hostSignOut:function(){ return auth.signOut(); }
  };
})();
