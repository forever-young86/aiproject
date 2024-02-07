package com.asia.survey.models;

import java.util.List;

public class Question {
	 private String text;
	    private List<AnswerOption> options;

	    // 생성자, getter, setter 등 필요한 메서드들을 추가합니다.

	    public Question(String text, List<AnswerOption> options) {
	        this.text = text;
	        this.options = options;
	    }

}
