package com.aisa.survey.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aisa.survey.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Integer>{

}
