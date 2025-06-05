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
      // 이메일 로그인 API 호출
      const res = await fetch(`${VITE_BASE_URL}/api/auth/login`, {
        // const res = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      // console.log("이메일 로그인 성공", data);
      // onClose();

      if (res.ok) {
        console.log("이메일 로그인 성공", data);
        localStorage.setItem("token", data.token); // 토큰 저장
        onClose();
      } else {
        setIsRegisterStage(true);
        setErrorMessage(data.message || "로그인 실패"); // 서버 에러 메시지 표시
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
        // const res = await fetch(`http://localhost:3000/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        body: JSON.stringify({
          email,
          password,
          name,
          nickname,
          birth: `${birthYear}-${birthMonth}-${birthDay}`,
          gender,
          address,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("이메일 회원가입 성공", data);
        localStorage.setItem("token", data.token); // 회원가입 후 자동 로그인
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
    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    if (!isRegisterStage) {
      // 첫 단계에서는 회원가입 단계로 전환만 수행
      setIsRegisterStage(true);
      setErrorMessage("");
      return;
    }

    // 회원가입 단계에서는 모든 필드 검증 후 요청
    if (!name || !nickname || !birthYear || !birthMonth || !birthDay || !gender || !address) {
      setErrorMessage("모든 항목을 입력해주세요.");
      return;
    }

    handleRegister();
  };

  // 버튼 텍스트와 활성화 상태 결정
  const isButtonDisabled = isRegisterStage ? 
    (!name || !nickname || !birthYear || !birthMonth || !birthDay || !gender || !address) : 
    (!email || !password);

  const buttonText = isRegisterStage ? "가입하기" : "다음";

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
          <button 
            className={`${styles.startBtn} ${isButtonDisabled ? styles.disabled : ''}`} 
            onClick={handleSave}
            disabled={isButtonDisabled}
          >
            {buttonText}
          </button>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Join;
