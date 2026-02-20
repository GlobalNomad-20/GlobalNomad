"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { MyActivityFormValues } from "../../_schema/myActivityFormSchema";
import { InputProps } from "../../types/input";

import InputWrapper from "./InputWrapper";
import SelectInput from "./select/SelectInput";

import { cn } from "@/utils/cn";
import { generateTimeOptions } from "@/utils/activityTime";
import PlusSvg from "@/assets/svg/PlusSvg";
import MinusSvg from "@/assets/svg/MinusSvg";
import Button from "@/components/common/Button";

export const ScheduleInput = ({ name, label, required }: InputProps) => {
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

  const handleStartTimeChange = (value: string) => {
    setStartTime(value);
    setInputError(false);
  };

  const handleEndTimeChange = (value: string) => {
    setEndTime(value);
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
      shouldDirty: true,
    });

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
        shouldDirty: true,
      });
    };
  };

  return (
    <InputWrapper label={label} error={error} required={required}>
      <div className="mt-2 flex flex-col items-end gap-3 md:flex-row">
        <div className="w-full">
          <h2 className="typo-14-m md:typo-16-m mb-2.5">날짜</h2>
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className={cn(
              "typo-16-m w-full rounded-2xl border border-gray-100 px-5 py-4 transition-colors",
              "shadow-[0px_2px_6px_0px_rgba(0,0,0,0.02)]",
              "focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none",
              inputError && "border-red-500 focus:border-red-500 focus:ring-red-500",
            )}
          />
        </div>
        <div className="flex w-full items-center gap-3">
          <div className="w-full md:w-33.5">
            <h2 className="typo-16-m mb-2.5 hidden md:block">시작 시간</h2>
            <SelectInput
              value={startTime}
              onChange={handleStartTimeChange}
              placeholder="시작 시간"
              options={timeOptions}
              error={inputError ? " " : undefined}
            />
          </div>
          <p className="typo-20-b mt-0 md:mt-5">-</p>
          <div className="w-full md:w-33.5">
            <h2 className="typo-16-m mb-2.5 hidden md:block">종료 시간</h2>
            <SelectInput
              value={endTime}
              onChange={handleEndTimeChange}
              placeholder="종료 시간"
              options={timeOptions}
              error={inputError ? " " : undefined}
            />
          </div>
          <div className="mt-0 flex h-10 w-10 items-center justify-center md:mt-7 md:h-13 md:w-13">
            <Button
              type="button"
              onClick={handleAddSchedule}
              className="h-7 w-7 rounded-full p-0 md:h-10.5 md:w-10.5"
            >
              <PlusSvg className="h-2 w-2 md:h-3 md:w-3" />
            </Button>
          </div>
        </div>
      </div>

      {schedules.length > 0 && (
        <div className="mt-5 space-y-5 border-t border-t-gray-100 pt-5">
          {schedules.map((schedule, index) => {
            const handleNoOp = () => {};

            return (
              <div
                key={`${schedule.date}-${schedule.startTime}-${index}`}
                className="flex flex-col items-end gap-3 md:flex-row"
              >
                <div className="w-full">
                  <input
                    type="date"
                    value={schedule.date}
                    disabled
                    className={cn(
                      "typo-16-m bg-gray-25 w-full rounded-2xl border border-gray-100 px-5 py-4",
                      "cursor-not-allowed text-gray-400 transition-colors",
                      "shadow-[0px_2px_6px_0px_rgba(0,0,0,0.02)]",
                    )}
                  />
                </div>
                <div className="flex w-full items-center gap-3">
                  <div className="pointer-events-none w-full opacity-50 md:w-33.5">
                    <SelectInput
                      value={schedule.startTime}
                      onChange={handleNoOp}
                      placeholder="시작 시간"
                      options={timeOptions}
                    />
                  </div>
                  <p className="typo-20-b text-gray-400">-</p>
                  <div className="pointer-events-none w-full opacity-50 md:w-33.5">
                    <SelectInput
                      value={schedule.endTime}
                      onChange={handleNoOp}
                      placeholder="종료 시간"
                      options={timeOptions}
                    />
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center md:h-13 md:w-13">
                    <Button
                      type="button"
                      onClick={handleRemoveSchedule(index)}
                      variant="outline"
                      className="h-7 w-7 rounded-full p-0 md:h-10.5 md:w-10.5"
                    >
                      <MinusSvg className="h-2 w-2 md:h-3 md:w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </InputWrapper>
  );
};

export default ScheduleInput;
