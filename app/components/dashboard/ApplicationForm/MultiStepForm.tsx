"use client";
import { useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";

import BasicDetails from "./BasicDetails";
import ConditionalFields from "./ConditionalFields";
import FormReview from "./FormReview";
import Payment from "./Payment";
import FormStepper from "./FormStepper";

import type { Step1FormValues } from "./BasicDetails";
import type { Step2FormValues } from "./ConditionalFields";
import { Button } from "@/components/ui/button";

type FullFormData = Step1FormValues & Partial<Step2FormValues>;
type FormState = Partial<FullFormData> & { registrationCategory?: string };

export default function MultiStepForm() {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormState>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [basicUserInfo, setBasicUserInfo] = useState<{ email: string; mobile_number: string } | null>(null);

    const methods = useForm<FullFormData>();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userInfo = JSON.parse(storedUser);
            setBasicUserInfo({ email: userInfo.email, mobile_number: userInfo.mobile_number });
        }
    }, []);
    
    // goNext and goBack are now back, as they are needed by child components
    const goNext = () => setStep(prev => prev + 1);
    const goBack = () => setStep(prev => prev - 1);

    const handleStep1 = (data: Step1FormValues & { registrationCategory?: string }) => {
        setFormData(prev => ({ ...prev, ...data }));
        setStep(2);
    };

    const handleStep2: SubmitHandler<Partial<Step2FormValues>> = (data) => {
        setFormData(prev => ({ ...prev, ...data }));
        setStep(3);
    };

    // The final submission function that gets triggered from the Payment component
    const handleFinalSubmit = async () => {
        setIsSubmitting(true);
        setSubmissionError(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setSubmissionError("Authentication token is missing. Please log in again.");
            setIsSubmitting(false);
            return;
        }

        const dataToSubmit = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value instanceof File) {
                dataToSubmit.append(key, value);
            } else if (value !== undefined && value !== null) {
                dataToSubmit.append(key, String(value));
            }
        });

        try {
            await axios.post(
                "http://localhost:5000/api/users/register",
                dataToSubmit,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Form submitted successfully!");
            router.push('/submission-success');
        } catch (error) {
            if (typeof error === "object" && error !== null && "response" in error && typeof (error as any).response === "object") {
                const errMsg = (error as any).response?.data?.error || (error as any).message;
                console.error("Form submission failed:", errMsg);
                setSubmissionError((error as any).response?.data?.error || "An unexpected error occurred.");
            } else {
                console.error("Form submission failed:", (error as any)?.message || error);
                setSubmissionError("An unexpected error occurred.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const steps = [
        { label: "Fill Basic Details" },
        { label: "Upload Details" },
        { label: "Review & Confirm" },
        { label: "Confirm & Pay" },
    ];

    const transitionVariants = {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <div>
            <h1 className="text-3xl font-semibold text-[#00694A] font-francois-one mb-6 pb-2 text-center">
                Application Form
            </h1>
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    variants={transitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.35 }}
                >
                    <div className="w-full bg-white rounded-lg shadow-md px-4 py-6 sm:px-8 md:px-12 border border-gray-200">
                        <FormStepper currentStep={step} steps={steps} />
                        {submissionError && <div className="p-4 mb-4 text-red-600 bg-red-100 rounded">{submissionError}</div>}
                        
                        {step === 1 && (
                            <BasicDetails
                                onNext={handleStep1}
                                defaultValues={formData as Step1FormValues}
                                basicUserInfo={basicUserInfo}
                            />
                        )}
                        {step === 2 && (
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(handleStep2)}>
                                    <ConditionalFields
                                        registrationCategory={formData.registrationCategory ?? ""}
                                        onBack={goBack}
                                        onNext={goNext}
                                        defaultValues={formData as Step2FormValues}
                                    />
                                    <div className="md:col-span-2 flex flex-col sm:flex-row justify-center gap-4 pt-6">
                                        <Button type="button" onClick={goBack} className="bg-[#8B0000] hover:bg-[#6b0000] text-white">Back</Button>
                                        <Button type="submit" className="bg-[#00694A] hover:bg-[#004d36] text-white">Next</Button>
                                    </div>
                                </form>
                            </FormProvider>
                        )}
                        {step === 3 && (
                            <>
                                <FormReview data={formData as FullFormData} />
                                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                                    <Button type="button" onClick={goBack} className="bg-[#8B0000] hover:bg-[#6b0000] text-white">Back</Button>
                                    <Button type="button" onClick={goNext} className="bg-[#00694A] hover:bg-[#004d36] text-white">Next</Button>
                                </div>
                            </>
                        )}
                        {step === 4 && (
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(handleFinalSubmit)}>
                                    <Payment onSubmit={methods.handleSubmit(handleFinalSubmit)} />
                                </form>
                            </FormProvider>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}