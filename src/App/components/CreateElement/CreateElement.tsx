import CustomButton from '@/App/Shared/common/Button/Button';
import CustomInput from '@/App/Shared/common/Input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ZodType } from 'zod';

interface ICreateProps<T extends FieldValues, P extends ZodType> {
  itemType: any[];
  itemSchema: P;
  onSubmit: SubmitHandler<T>;
  mathRef?: React.MutableRefObject<any>
  setQuestionTextState?: React.Dispatch<React.SetStateAction<string>>
  children?: JSX.Element
}

export default function CreateElement<
  T extends FieldValues,
  P extends ZodType,

>({ itemType, itemSchema, onSubmit, mathRef, setQuestionTextState, children, }: ICreateProps<T, P>) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(itemSchema),
  });
  //@ts-ignore
  const questionText = watch('questionText')

  useEffect(() => {
    if (setQuestionTextState !== undefined) {
      setQuestionTextState(`${questionText}`)
    }
  }, [questionText])
  return (
    <div className="mt-8 ml-2 flow-root">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <form className="max-w-3xl" onSubmit={handleSubmit(onSubmit)}>
            {itemType.map((item, idx) => {
              return (
                <div key={idx}>
                  <CustomInput
                    isRequired={true}
                    register={register}
                    name={item.name}
                    type="text"
                    defaultValue={item.defaultValue}
                    label={item.label}
                    placeholder={item.placeholder}
                    readOnly={item.disabled ? item.disabled : false}
                  />
                  <p
                    className="mt-2 text-xs text-red-600"
                    id="subject-error"
                  ></p>
                </div>
              );
            })}
            {children}
            <br />
            <CustomButton customCss="mt-8" isSubmit={true}>
              Create
            </CustomButton>
          </form>
        </div>
      </div>
    </div >
  );
}
