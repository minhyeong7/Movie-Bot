package com.moviebot.backend.service;

import com.moviebot.backend.dto.request.MemberRequest;
import com.moviebot.backend.dto.response.MemberResponse;
import com.moviebot.backend.entity.Member;
import com.moviebot.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    // 멤버 생성 회원가입
    public MemberResponse create(MemberRequest memberRequest){
        var member = Member.builder()
                .name(memberRequest.getName())
                .email(memberRequest.getEmail())
                .password(passwordEncoder.encode(memberRequest.getPassword()))
                .enabled(true)
                .build();

        memberRepository.save(member);


        return mapToMemberResponse(member);
    }

    // 회원목록 전체 조회
    public List<MemberResponse> findAll(){
        return memberRepository.findAll()
                .stream() //컬렉션(List, Set 등)을 하나씩 흘려보내면서 처리하는 파이프 즉 for문을 대신하는 최신 문법
                .map(this::mapToMemberResponse) // member객체를 member response객체로 변환
                .toList(); // 다시 list로
    }

    // 회원 단일 조회
    public MemberResponse findById(Long id){
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("회원없음"));

        return mapToMemberResponse(member);
    }


    // 멤버 공통 응답
    private MemberResponse mapToMemberResponse(Member member){
        return MemberResponse.builder()
                .id(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .createdAt(member.getCreatedAt())
                .build();
    }
}
