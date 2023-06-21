import { CreateQuestionSchema, CreateQuestionSchemaSubmitType, CreateQuestionSchemaType } from '@/App/Schema/Question.Schema';
import { v4 as uuidv4 } from 'uuid'
import CreateElement from '@/App/components/CreateElement/CreateElement';
import { popError } from '@/App/components/PopUp/popError';
import { popSucess } from '@/App/components/PopUp/popSuccess';
import PrivateRoute from '@/App/hook/PrivateRoute';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import CustomButton from '@/App/Shared/common/Button/Button';
import { HiOutlineTrash } from 'react-icons/hi';
import { createSubject } from '@/App/Services/Subjects';
import { createQuestion } from '@/App/Services/Questions';

export default function CreatePage() {
  const router = useRouter();
  const lectureId: number = Number(router.query.lectureId);
  const [alternatives, setAlternatives] = useState<{ id: string, text: string, isCorrect: boolean }[]>(
    [
      {
        id: uuidv4(),
        text: '',
        isCorrect: false
      },
    ])
  const addAlternative = () => {
    setAlternatives(prev => {
      return [
        ...prev,
        {
          id: uuidv4(),
          text: '',
          isCorrect: false
        }
      ]
    })
  }
  const removeAlternative = (id: string) => {
    const filteredAlternatives = alternatives.filter(alernative => {
      return alernative.id !== id
    })
    setAlternatives(filteredAlternatives)
  }
  const handleToggleCheckBox = (id: string) => {
    const newAlernative = alternatives.map(alertnative => {
      if (alertnative.id === id) {
        return {
          ...alertnative,
          isCorrect: !alertnative.isCorrect
        }
      } else {
        return alertnative
      }
    })
    setAlternatives(newAlernative)
  }
  const handleChangeAlernative = ({ e, id }: { e: React.ChangeEvent<HTMLInputElement>, id: string }) => {
    const value = e.target.value
    const newAlternatives = alternatives.map(alternative => {
      if (alternative.id === id) {
        return {
          ...alternative,
          text: value
        }
      } else {
        return alternative
      }
    })
    setAlternatives(newAlternatives)
  }
  const onSubmit: SubmitHandler<CreateQuestionSchemaType> = async (data) => {
    try {
      const answers = alternatives.map(alternative => {
        return {
          alternativeText: alternative.text,
          isCorrect: alternative.isCorrect
        }
      })
      const submitData: CreateQuestionSchemaSubmitType = {
        ...(lectureId ? { lectureId: [lectureId] } : {}),
        questionText: data.questionText,
        alternatives: answers
      }
      await createQuestion(submitData);
      popSucess('Question created');
      router.push('/questions');
    } catch (e) {
      popError('Error creating subject');
    }
  };
  return (
    <PrivateRoute>
      <>
        <CreateElement<CreateQuestionSchemaType, typeof CreateQuestionSchema>
          itemType={[
            { label: 'Question', name: 'questionText', placeholder: 'Question Text' },
          ]}
          itemSchema={CreateQuestionSchema}
          onSubmit={onSubmit}
          children={<>
            <p
              className="block text-sm font-medium text-gray-700"
            >
              Alternative
            </p>
            <div className='flex gap-4 flex-wrap'>
              {
                alternatives.map((alternative, idx) => {
                  return (
                    <div className='flex items-center gap-4 w-full mt-2' key={idx}>
                      <input type="checkbox" name={`name${alternative.id}`} checked={alternative.isCorrect} onChange={() => handleToggleCheckBox(alternative.id)} />
                      <input type="text" name={`name${alternative.id}`} id={`id${alternative.id}`} className="block w-full rounded-md 
                      border-gray-300 pl-10 focus:border-darkBlue focus:ring-darkBlue sm:text-sm" value={alternative.text}
                        onChange={(e) => handleChangeAlernative({ e, id: alternative.id })}
                      />
                      <div
                        onClick={() => { removeAlternative(alternative.id) }}
                        className="text-red-600 hover:text-indigo-900 hover:cursor-pointer"
                      >
                        <div className="flex items-center">
                          <HiOutlineTrash className="mr-1" size={20} />
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <CustomButton customCss="w-[100%] mt-8 ml-auto bg-[#003370]" onClick={addAlternative} >
              Add alternative
            </CustomButton>
          </>}
        />

      </>
    </PrivateRoute>
  );
}
