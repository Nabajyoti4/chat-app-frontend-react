import React from "react";
//redux
import { useSelector } from "react-redux";
import GroupChatPanel from "../Group/GroupChatPanel/GroupChatPanel";
import SingleChatPanel from "../Single/SingleChatPanel";

// css
import "./ChatPanel.css";

function ChatPanel() {
  const showChat = useSelector((state) => state.singleChat.singleChatShow);
  const showGroup = useSelector((state) => state.group.groupChat);

  return (
    <div className="chatPanel">
      {!showChat && !showGroup && (
        <div className="chatPanel__empty">
          <h3>Start Chatting</h3>
        </div>
      )}

      {showChat && <SingleChatPanel></SingleChatPanel>}
      {showGroup && <GroupChatPanel></GroupChatPanel>}
    </div>
  );
}

export default ChatPanel;
