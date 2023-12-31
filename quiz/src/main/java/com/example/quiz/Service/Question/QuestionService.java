package com.example.quiz.Service.Question;

import com.example.quiz.model.Question;
import com.example.quiz.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    public List<Question> findAllQuestion(Long quizId){
        return questionRepository.findByQuizQId(quizId);
    }
}
