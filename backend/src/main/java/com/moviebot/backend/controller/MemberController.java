package com.moviebot.backend.controller;

import com.moviebot.backend.entity.Member;
import com.moviebot.backend.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MemberController {
    @Autowired
    public MemberRepository memberRepository;

    @GetMapping("/members")
    public List<Member> get(){
        return memberRepository.findAll();
    }

    @PostMapping("/members")
    public Member post(@RequestBody Member member){
        return memberRepository.save(member);
    }
}
