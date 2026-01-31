package com.moviebot.backend.controller;

import com.moviebot.backend.dto.request.MemberRequest;
import com.moviebot.backend.dto.response.MemberResponse;
import com.moviebot.backend.entity.Member;
import com.moviebot.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    // 회원가입
    @PostMapping
    public MemberResponse create(@RequestBody MemberRequest memberRequest){

        return memberService.create(memberRequest);
    }

    // 회원 목록 전체 조회
    @GetMapping
    public List<MemberResponse> findAll(){
        return memberService.findAll();
    }


    // 회원  단일 조회
    @GetMapping("/{id}")
    public MemberResponse findById(@PathVariable Long id){
        return memberService.findById(id);
    }

    // 회원 수정
    @PutMapping("/{id}")
    public MemberResponse update(@PathVariable Long id,@RequestBody MemberRequest memberRequest){
        return  memberService.updateById(id,memberRequest);
    }

    // 회원 탈퇴
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,String>> delete(@PathVariable Long id){
        memberService.deleteById(id);

        return ResponseEntity.ok(
                Map.of("message","회원이 정상적으로 탈퇴되었습니다")
        );
    }

}
