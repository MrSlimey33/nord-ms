import { fb } from './firebase.js';

const auth = fb.auth;

// When user logs in, show friends
auth.onAuthStateChanged(user => {
  if (!user) {
    location.href = "login.html";
    return;
  }
  loadFriends(user.uid);
});

function loadFriends(uid) {
  const friendsBox = document.getElementById("friendsList");
  const friendsRef = fb.ref(fb.db, `users/${uid}/friends`);

  fb.onValue(friendsRef, snap => {
    friendsBox.innerHTML = "<h3>Your Friends</h3>";

    const friends = snap.val() || {};
    Object.keys(friends).forEach(fid => {
      const btn = document.createElement("button");
      btn.textContent = fid;
      btn.onclick = () => openChat(fid);
      friendsBox.appendChild(btn);
    });
  });
}

let activeChat = null;

function openChat(friendID) {
  const me = auth.currentUser.uid;
  activeChat = fb.chatIDFor(me, friendID);

  document.getElementById("chatBox").classList.remove("hidden");
  document.getElementById("chatWith").textContent = `Chatting with: ${friendID}`;

  const msgBox = document.getElementById("messages");
  const chatRef = fb.ref(fb.db, `chats/${activeChat}`);

  fb.onValue(chatRef, snap => {
    msgBox.innerHTML = "";
    const msgs = snap.val() || {};
    Object.values(msgs).forEach(m => {
      const div = document.createElement("div");
      div.className = "msg";
      div.textContent = `${m.from}: ${m.text}`;
      msgBox.appendChild(div);
    });
  });
}

document.getElementById("sendBtn").onclick = () => {
  if (!activeChat) return;
  const input = document.getElementById("msgInput");

  fb.push(fb.ref(fb.db, `chats/${activeChat}`), {
    from: auth.currentUser.email,
    text: input.value,
    time: Date.now()
  });

  input.value = "";
};
