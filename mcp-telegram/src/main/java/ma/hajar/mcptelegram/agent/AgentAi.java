package ma.hajar.mcptelegram.agent;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class AgentAi {
    public ChatClient chatClient;

    public AgentAi(ChatClient.Builder chatClient, ChatMemory chatMemory, ToolCallbackProvider tools) {
        Arrays.stream(tools.getToolCallbacks()).forEach(toolCallback -> {
            System.out.println("----------------------");
            System.out.println(toolCallback.getToolDefinition());
            System.out.println("----------------------");
        });
        this.chatClient = chatClient
                .defaultSystem("""
                        Vous un assistant qui se charge de répondre aux question
                                                de l'utilisateur en fonction du contexte fourni.
                                                Si aucun contexte n'est fourni, répond avec JE NE SAIS PAS\s
                        """)
                .defaultAdvisors(MessageChatMemoryAdvisor.builder(chatMemory).build())
                .defaultToolCallbacks(tools)
                .build();
    }

    public String chat(String query) {
        return this.chatClient.
                prompt()
                .user(query)
                .call()
                .content();
    }
}
