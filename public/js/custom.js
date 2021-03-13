// message.ejsで使われるコード

client = new StreamChat("rhuph3ha9crr");

//ページが開いたら色々動くための関数
function getvalues(){
    // ログインしている自分の名前
    names=document.getElementsByClassName('username');
    // ログインしている自分のトークン
    tokens=document.getElementsByClassName('usertoken');
    // ログインしている自分のID
    user_ids=document.getElementsByClassName('user_id');
    // 参加者のトークン
    participant_tokens=document.getElementsByClassName('participant_token');
    // 参加者のID
    participant_ids=document.getElementsByClassName('participant_id');
    // 選択している相手（参加者）の名前
    participant_names=document.getElementsByClassName('participant_name-top');
    // 参加者名全取得
    get_participant_name_array=document.getElementById('participant_name_array');
    // 参加者名+参加者のユーザID全取得
    get_participant_id=document.getElementById('stream_id_array');

    // ログインしている自分のユーザ名
    username=names[0].innerHTML;
    // ログインしている自分のトークン
    token=tokens[0].innerHTML;
    // ログインしている自分のID
    user_id=user_ids[0].innerHTML;
    console.log("自分のID",user_id);
    // 参加者のトークン
    participant_token=participant_tokens[0].innerHTML;
    // 参加者のID
    participant_id=participant_ids[0].innerHTML;
    console.log("参加者のID",participant_id);
    // 選択している相手(参加者)の名前
    participant_name_array=participant_names[0].innerHTML.split('とのメッセージ',1);
    // 選択している相手(参加者)の名前
    participant_name=participant_name_array[0];
    // 参加者全員のメアド+ID
    participant_id_array=get_participant_id.innerHTML.split(',');
    // 参加者全員の名前
    participant_name_array=get_participant_name_array.innerHTML.split(',');
    // 参加者数
    participant_length=participant_id_array.length;
    userdata = []
    for(var i=0;i<participant_length;i++){
        // (参加者名+ID) + @+@ + (参加者名)
        userdata[i]=participant_id_array[i]+'@+@'+participant_name_array[i]
    }
    initializeClient(user_id,username,token,participant_name,participant_id,participant_token);
    initializeChannel(user_id,participant_id);
}

getvalues();

// ココも怪しい
//sendmessageする関数
async function sendMessage(message) {
    return await channel.sendMessage({
        text: message,
    })
}

//クライアントを初期化するための関数 ページ読み込み時に毎回行う必要がある　
async function initializeClient(user_id,username,token,participant_name,participant_id,participant_token) {
    // 参加者の未読メッセージが返ってくる
    await client.setUser({
        id: participant_id,
        name: participant_name,
    }, participant_token);
    client.disconnect();

    // ログインしている自分の未読メッセージが返ってくる
    await client.setUser({
        id: user_id,
        name: username,
    }, token);
    // チャンネルリストの取得
    listchannels(user_id)
    return client;
}


//enterを押すとメッセージを送信する関数
const inputElement = document.getElementById("message-input");
inputElement.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        sendMessage(inputElement.value)
        inputElement.value = "";
    }
});


// ココが怪しい
//一対一のチャットをする関数
async function initializeChannel(user_id,participant_id) {
    channel = client.channel('messaging',{
        members: [user_id, participant_id],
    });
    
    await channel.watch();
    
    channel.on("message.new", event => {
        appendMessage(event.message);
    });
    
    channel.state.messages.forEach(message => {
        appendMessage(message);
    });
    
}

// チャンネルリストを表示する関数
async function listchannels(user_id){
    // 特定のユーザーを含むメッセージングチャネルを作成するためのフィルターを作成する
    const filter = {members: { $in: [user_id] } };
    // 最近のメッセージをチャンネルリストの一番上に置く
    const sort = { last_message_at: -1 };
    // チャンネルを監視したり操作したりすることができるようになる
    const channels = await client.queryChannels(filter,sort,{
        watch:true,
        state:true,
    });
    participant_keys=[];
    for( channel of channels){
        // 参加者のメアドの前半をkeysに代入
        let keys=channel.state.members
        for(key in keys){
            if(key!==user_id){
                // 自分のIDと一致している場合はユーザチャンネルに表示しない。つまり、自分をチャンネルに表示しないということ。
                // 参加者全員がユーザチャンネルに表示される
                participant_keys.push(key);
            }
        }
    }
    past_id_array=( participant_id_array , participant_keys )=>{
        return [...new Set(participant_id_array)].filter(value=> participant_keys.includes(value));
    }
    // ユーザリスト表示
    populateusers()
}


//ユーザーリストを表示する関数
function populateusers(){
    const talklistElement = document.getElementById('talk-list');
    var get_current_partner = document.getElementById('currentchat_partner_id');
    // 現在選択している相手(参加者のメアド+参加者のID)
    current_partner = get_current_partner.innerHTML;
    // 参加者のユーザ名一覧を表示する実際のHTMLを生成
    participantsElement=document.createElement('div');
    participantsElement.id='participants';
    talklistElement.appendChild(participantsElement);

    // 参加者を全員表示するfor文
    console.log("参加者リスト",participant_id_array);
    console.log("現在の相手",current_partner);
    for(var i=0; i<participant_length; i++){
        // 選択したユーザと現在選択済みのユーザが違ったら...
        if(past_id_array(participant_id_array,participant_keys)[i] !== current_partner){
            console.log("ここれれ",past_id_array(participant_id_array,participant_keys)[i]);

            let past_id_list = past_id_array(participant_id_array,participant_keys)[i];
            
            // 参加者IDから何かを検索、何番目の要素かというのを返す
            let name_num=participant_id_array.indexOf(past_id_list);
            console.log("番号",name_num);
            // divタグid=participantsの中に、さらにdivタグを加える
            participant_list=document.createElement('div');
            participant_list.className="participant_list";
            participant_list.id="participant_list";
            
            // 参加者リストにて、参加者名を表示する
            const participantsNameElement=document.createElement('div')
            participantsNameElement.className="participant_name";
            participantsNameElement.id='participant_name';
            participantsNameElement.textContent=participant_name_array[name_num]
            
            // 参加者のIDを表示する（フロントでは非表示になっているが）
            const participantsIdElement=document.createElement('div')
            participantsIdElement.className="participant_list_id";
            participantsIdElement.id='participant_list_id';
            participantsIdElement.textContent=past_id_array(participant_id_array,participant_keys)[i];
            
            participantsElement.append(participant_list)
            participant_list.append(participantsNameElement);
            participant_list.append(participantsIdElement); 
        }  
    }
    
    clickedlist()
}

function clickedlist(){
    get_participant_list=document.getElementsByClassName("participant_list");
    console.log(get_participant_list);
    for(let i=0;i<participant_length;i++){
        // リスト内のユーザがクリックされると発動
        get_participant_list[i].addEventListener("click",(event)=>{
            // クリックした要素の情報を取得
            let target =event.currentTarget;
            clicked_name=target.firstElementChild.innerHTML;
            clicked_id=target.lastElementChild.innerHTML;

            // 上記で取得後、誰とメッセージしているのかを以下のようにして表示する
            var messagepartner = document.getElementById('chat-partner');
            messagepartner.innerHTML = clicked_name+"とのメッセージ";
            var currentchat_partner_id = document.getElementById('currentchat_partner_id');
            currentchat_partner_id.innerHTML= clicked_id;

            // チャットをするユーザが変わったので１対１のチャットの準備
            initializeChannel(user_id,clicked_id);
            console.log("クリック",clicked_id);

            // チャットをするユーザを変えたのでもともとあったメッセージなどは見た目上削除
            messages.remove();
            participantsElement.remove();

            // ユーザリストの再表示
            populateusers();
        })
    }
}

//画面上にメッセージを追加するための関数
function appendMessage(message) {
    makemessagearea();
    messages=document.getElementById('messages')

    const messageDiv = document.createElement("div")
    messageDiv.className = `message ${ message.user.name === username ? 'message-right' : 'message-left' }`

    const usernameDiv = document.createElement("div")
    usernameDiv.className = "message-username"
    usernameDiv.textContent = `${message.user.name}`
    messageDiv.append(usernameDiv)

    const sendtime = document.createElement("div");
    sendtime.className = "send-time";
    let string_minutes = "" + message.created_at.getMinutes();
    if (string_minutes.length === 1) {
        string_minutes = "0" + string_minutes;
    }
    sendtime.textContent = message.created_at.getHours()+":"+string_minutes;
    messageDiv.append(sendtime);

    const messagebox=document.createElement("div")
    messagebox.className='messagebox';
    messageDiv.appendChild(messagebox)

    const messagecontent=document.createElement('div')
    messagecontent.className='messagecontent';
    messagebox.appendChild(messagecontent);


    const messageTextDiv = document.createElement("div")
    messageTextDiv.className = "message-text"
    messageTextDiv.textContent = message.text
    messagecontent.append(messageTextDiv)

    const messageclear=document.createElement('div')
    messageclear.className='messageclear';

    messageareaDiv.appendChild(messageDiv)
    messageareaDiv.appendChild(messageclear)
}

//messagesの下にdivを作成するための関数
function makemessagearea(){
    const get_chatscreen=document.getElementById('chat-screen')
    make_messages=document.createElement('div')
    make_messages.id='messages';
    get_chatscreen.appendChild(make_messages)
    const messageContainer = document.getElementById("messages")
    messageareaDiv=document.createElement('div')
    messageareaDiv.id='messagearea'
    messageContainer.appendChild(messageareaDiv)
}
//messagesの下にdivを作成するための関数
function makeparticipants(){
    const messageContainer = document.getElementById("messages")
    messageareaDiv=document.createElement('div')
    messageareaDiv.id='messagearea'
    messageContainer.appendChild(messageareaDiv)
}