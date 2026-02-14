"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { MyActivityFormValues } from "../../_schema/myActivityFormSchema";
import { InputProps } from "../../types/input";

import InputWrapper from "./InputWrapper";

import { cn } from "@/utils/cn";
import { generateTimeOptions } from "@/utils/activityTime";
import PlusSvg from "@/assets/svg/PlusSvg";
import MinusSvg from "@/assets/svg/MinusSvg";

export const ScheduleInput = ({ name, label, required, className }: InputProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<MyActivityFormValues>();

  const schedules = (watch(name) as MyActivityFormValues["schedules"]) || [];
  const error = errors[name]?.message as string | undefined;

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [inputError, setInputError] = useState(false);

  const timeOptions = generateTimeOptions();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    setInputError(false);
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTime(e.target.value);
    setInputError(false);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTime(e.target.value);
    setInputError(false);
  };

  const handleAddSchedule = () => {
    if (!date || !startTime || !endTime) {
      setInputError(true);
      return;
    }

    if (startTime >= endTime) {
      setInputError(true);
      return;
    }

    const newSchedule = { date, startTime, endTime };
    setValue(name, [...schedules, newSchedule] as MyActivityFormValues[typeof name], {
      shouldValidate: true,
    });

    // 입력 필드 초기화
    setDate("");
    setStartTime("");
    setEndTime("");
    setInputError(false);
  };

  const handleRemoveSchedule = (index: number) => {
    return () => {
      const newSchedules = schedules.filter((_, i) => {
        return i !== index;
      });
      setValue(name, newSchedules as MyActivityFormValues[typeof name], {
        shouldValidate: true,
      });
    };
  };

  return (
    <InputWrapper label={label} error={error} required={required}>
      <div className={cn("space-y-4", className)}>
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className={cn(
              "typo-16-m flex-1 rounded-2xl border border-gray-100 px-5 py-4.5 transition-colors",
              "shadow-[0px_2px_6px_0px_rgba(0,0,0,0.02)]",
              "focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none",
              inputError && "border-red-500 focus:border-red-500 focus:ring-red-500",
            )}
          />

          <div className="flex gap-3">
            <select
              value={startTime}
              onChange={handleStartTimeChange}
              className={cn(
                "typo-16-m flex-1 rounded-2xl border border-gray-100 px-5 py-4.5 transition-colors",
                "shadow-[0px_2px_6px_0px_rgba(0,0,0,0.02)]",
                "focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none",
                !startTime && "text-gray-400",
                inputError && "border-red-500 focus:border-red-500 focus:ring-red-500",
              )}
            >
              <option value="" disabled>
                시작 시간
              </option>
              {timeOptions.map((time) => {
                return (
                  <option key={time} value={time}>
                    {time}
                  </option>
                );
              })}
            </select>

            <select
              value={endTime}
              onChange={handleEndTimeChange}
              className={cn(
                "typo-16-m flex-1 rounded-2xl border border-gray-100 px-5 py-4.5 transition-colors",
                "shadow-[0px_2px_6px_0px_rgba(0,0,0,0.02)]",
                "focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none",
                !endTime && "text-gray-400",
                inputError && "border-red-500 focus:border-red-500 focus:ring-red-500",
              )}
            >
              <option value="" disabled>
                종료 시간
              </option>
              {timeOptions.map((time) => {
                return (
                  <option key={time} value={time}>
                    {time}
                  </option>
                );
              })}
            </select>

            <button
              type="button"
              onClick={handleAddSchedule}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-900
                text-white transition-colors hover:bg-gray-800"
            >
              <PlusSvg className="h-6 w-6" />
            </button>
          </div>
        </div>

        {schedules.length > 0 && (
          <div className="space-y-2">
            {schedules.map((schedule, index) => {
              return (
                <div
                  key={`${schedule.date}-${schedule.startTime}-${index}`}
                  className="bg-gray-25 flex items-center justify-between rounded-xl border
                    border-gray-100 px-5 py-3"
                >
                  <span className="typo-16-m text-gray-900">
                    {schedule.date} · {schedule.startTime} ~ {schedule.endTime}
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveSchedule(index)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600
                      transition-colors hover:bg-gray-100"
                  >
                    <MinusSvg className="h-5 w-5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </InputWrapper>
  );
};

export default ScheduleInput;
