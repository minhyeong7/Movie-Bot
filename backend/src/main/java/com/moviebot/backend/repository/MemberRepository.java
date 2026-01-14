package com.moviebot.backend.repository;

import com.moviebot.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> { // Long은 Member객체의 id타입 지정
    // ========== CREATE / UPDATE ==========
    // 저장 (새 엔티티면 insert, 있으면 update)
    // Member save(Member entity);

    // 여러 개 저장
    // List<Member> saveAll(Iterable<Member> entities);

    // ========== READ ==========
    // PK로 조회
    // Optional<Member> findById(Long id);

    // 전체 조회
    // List<Member> findAll();

    // 여러 PK로 조회
    // List<Member> findAllById(Iterable<Long> ids);

    // 개수 조회
    // long count();

    // 존재 여부 확인
    // boolean existsById(Long id);

    // ========== DELETE ==========
    // 엔티티 삭제
    // void delete(Member entity);

    // PK로 삭제
    // void deleteById(Long id);

    // 여러 개 삭제
    // void deleteAll(Iterable<? extends Member> entities);

    // 전체 삭제
    // void deleteAll();
}
