package net.rachel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
public class TmsBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TmsBackendApplication.class, args);
    }

}

