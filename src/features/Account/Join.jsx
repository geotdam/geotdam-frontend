import * as React from "react";
const { useState, useCallback } = React;

import styles from "./Join.module.css";

import Icon from "../../components/common/Icon";
import closeIcon from "../../assets/icons/close.svg";

const Join = ({ onClose }) => {
  // 1) 이메일·비밀번호
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2) 회원가입 추가 정보
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  // 3) 로그인 실패 여부(== 회원가입 단계로 전환)
  const [isRegisterStage, setIsRegisterStage] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL; // .env에서 베이스 url 불러오기

  // 이메일 로그인
  const handleEmailLogin = useCallback(async () => {
    try {
      const res = await fetch(`${VITE_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });
      const data = await res.json();

      if (res.ok) {
        console.log("이메일 로그인 성공", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // 사용자 정보도 저장
        onClose();
      } else {
        setIsRegisterStage(true);
        setErrorMessage(data.message || "로그인 실패");
      }
    } catch (err) {
      console.error("이메일 로그인 실패", err);
      setIsRegisterStage(true);
    }
  }, [email, password, onClose]);

  const handleRegister = useCallback(async () => {
    // 필수 입력 체크
    if (
      !name ||
      !nickname ||
      !birthYear ||
      !birthMonth ||
      !birthDay ||
      !gender ||
      !address
    ) {
      setErrorMessage("모든 항목을 입력해주세요.");
      return;
    }

    try {
      // 회원가입 api
      console.log("회원가입 요청");
      const res = await fetch(`${VITE_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name,
          nickname,
          birth: `${birthYear}-${birthMonth}-${birthDay}`,
          gender,
          address,
        }),
        credentials: "include"
      });

      const data = await res.json();

      if (res.ok) {
        console.log("이메일 회원가입 성공", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // 회원가입 성공 시에도 사용자 정보 저장
        onClose();
      } else {
        setErrorMessage(data.message || "회원가입 실패");
      }
    } catch (err) {
      console.error("이메일 회원가입 실패", err);
    }
  }, [
    email,
    password,
    name,
    nickname,
    birthYear,
    birthMonth,
    birthDay,
    gender,
    address,
    onClose,
  ]);

  const handleSave = () => {
    if (isRegisterStage) {
      handleRegister();
    } else {
      handleEmailLogin();
    }
  };

  // 연도, 월, 일 목록
  const years = Array.from({ length: 100 }, (_, i) => `${2025 - i}`);
  const months = Array.from({ length: 12 }, (_, i) =>
    `${i + 1}`.padStart(2, "0")
  );
  const days = Array.from({ length: 31 }, (_, i) =>
    `${i + 1}`.padStart(2, "0")
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.loginContainer}>
        <button className={styles.closeBtn} onClick={onClose}>
          <Icon src={closeIcon} alt="닫기" backgroundColor="transparent" />
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>시작하기</h2>
          <p className={styles.subtitle}>
            로그인하고 <span className={styles.highlight}>걷는 경험</span>을
            담아보세요. <br></br>
            가입 되지 않은 경우 자동 회원가입 됩니다.
          </p>
        </div>

        <div className={styles.inform}>
          <input
            type="email"
            className={styles.bigbox}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <input
            type="password"
            className={styles.bigbox}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />

          {isRegisterStage && (
            <>
              <input
                value={name}
                className={styles.bigbox}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름"
              />
              <input
                value={nickname}
                className={styles.bigbox}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임"
              />
              <input
                value={address}
                className={styles.bigbox}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="주소"
              />

              <div className={styles.birth}>
                <select
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  className={styles.box}
                >
                  <option value="">출생 연도</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>

                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className={styles.box}
                >
                  <option value="">월</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <div className={styles.txt}>월</div>

                <select
                  value={birthDay}
                  onChange={(e) => setBirthDay(e.target.value)}
                  className={styles.box}
                >
                  <option value="">일</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <div className={styles.txt}>일</div>
              </div>
              <div className={styles.birth}>
                <div className={styles.txt}>성별</div>
                {["female", "male", "other"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setGender(option)}
                    className={`${styles.genderBtn} ${
                      gender === option ? styles.selected : ""
                    }`}
                  >
                    {option === "female"
                      ? "여성"
                      : option === "male"
                      ? "남성"
                      : "기타"}
                  </button>
                ))}
              </div>
            </>
          )}
          <button className={styles.startBtn} onClick={handleSave}>
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;
