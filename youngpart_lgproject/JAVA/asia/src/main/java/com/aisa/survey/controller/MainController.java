package com.aisa.survey.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.aisa.survey.Service.QuestionService;
import com.aisa.survey.entity.Question;
import com.aisa.survey.repository.QuestionRepository;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class MainController {
	
	@Autowired
	private final QuestionRepository questionRepository;
	
	// 첫번째 [시작화면]
	@GetMapping("/")
	public String main() {
		return "main";
	}
	
	// 두번째 [선택화면]
	@GetMapping("/select")
	public String select() {
		return "select";
	}
	

  // 세번째 [설문화면]
  
//  @GetMapping("/survey") public String survey(Model model) { List<Question>
//  questionList = this.questionRepository.findAll();
//  model.addAttribute("questionList", questionList); return "survey"; }
//  
//  }
	
	@GetMapping("/survey")
	public String getFirstQuestionSet(Model model) {
	    List<Question> questionList = this.questionRepository.findByQuestionIdBetween(1, 6);
	    model.addAttribute("questionList", questionList);
	    return "survey"; // survey.html은 질문 세트를 표시하는 템플릿 파일입니다.
	}
	
	@GetMapping("/survey/{setId}")
	public String getQuestionSetById(@PathVariable("setId") int setId, Model model) {
	    List<Question> questionList = new ArrayList<>();
	    if (setId == 2) {
	        questionList = this.questionRepository.findByQuestionIdBetween(7, 15);
	    } else if (setId == 3) {
	        questionList = this.questionRepository.findByQuestionIdBetween(16, 21);
	    }
	    
	    // 현재 사용자가 표시할 질문 세트를 모델에 추가합니다.
	    model.addAttribute("questionList", questionList);
	    
	    // survey.html은 질문 세트를 표시하는 템플릿 파일입니다.
	    return "survey";
	}

	@PostMapping("/submitAnswers")
	public ResponseEntity<Integer> submitAnswers(@RequestBody Map<String, String> answers) {
	    // setId 값이 존재하지 않을 경우 기본적으로 1로 설정합니다.
	    int currentSetId = answers.containsKey("setId") ? Integer.parseInt(answers.get("setId")) : 1;
	    // 응답을 처리하고 다음 질문 세트의 setId를 반환합니다.
	    int nextSetId = processAnswersAndReturnNextSetId(currentSetId); // 다음 질문 세트의 setId를 결정하는 메서드 호출
	    return ResponseEntity.ok(nextSetId);
	}

	
	private int processAnswersAndReturnNextSetId(int currentSetId) {
	    int nextSetId = 0;
	    if (currentSetId == 1) {
	        nextSetId = 2;
	    } else if (currentSetId == 2) {
	        nextSetId = 3;
	    }
	    return nextSetId;
	}
	
	
	// 네번째번째 [결과화면]
	@GetMapping("/result")
	public String result() {
		return "result";
	}

}
 