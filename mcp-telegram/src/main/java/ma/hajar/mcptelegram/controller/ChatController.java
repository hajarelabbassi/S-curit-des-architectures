package ma.hajar.mcptelegram.controller;

import ma.hajar.mcptelegram.agent.AgentAi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ChatController {
    @Autowired
    public AgentAi agentAi;

    @GetMapping(value = "/chat", produces = MediaType.TEXT_PLAIN_VALUE)
    public String chat(String query) {
        return this.agentAi.chat(query);
    }
}
