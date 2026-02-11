import { useForm, useWatch } from "react-hook-form";

export type ProfileFormValues = {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type InitialData =
  | {
      nickname: string;
      email: string;
    }
  | undefined
  | null;

const useProfileEditForm = (initialData: InitialData) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      nickname: initialData?.nickname || "",
      email: initialData?.email || "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
  });

  const password = useWatch({ control, name: "password" }) ?? "";
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validationRules = {
    nickname: {
      required: "닉네임을 입력해주세요.",
      maxLength: {
        value: 10,
        message: "닉네임은 10자 이하로 작성해야 합니다.",
      },
    },
    email: {
      required: "이메일을 입력해주세요.",
      pattern: {
        value: emailPattern,
        message: "올바른 이메일 형식이 아닙니다.",
      },
    },
    password: {
      required: false,
      minLength: {
        value: 8,
        message: "비밀번호는 8자 이상이어야 합니다.",
      },
    },
    passwordConfirm: {
      validate: (value: string) => {
        if (!password) return true;
        return value === password || "비밀번호가 일치하지 않습니다.";
      },
    },
  };

  return { register, handleSubmit, errors, validationRules };
};

export default useProfileEditForm;
