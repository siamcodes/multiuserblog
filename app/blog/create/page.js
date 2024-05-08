"use client";
import { useEffect } from "react";
import BlogTitle from "@/components/blog/create/BlogTitle";
import BlogContent from "@/components/blog/create/BlogContent";
import Tags from "@/components/blog/create/Tags";
import FeaturedImage from "@/components/blog/create/FeaturedImage";
import ReviewAndSubmit from "@/components/blog/create/ReviewAndSubmit";
import { useBlog } from "@/context/blog";
import { useRouter, useSearchParams } from "next/navigation";

export default function BlogCreatePage() {
  // context
  const {
    title,
    markdown,
    selectedTags,
    featuredImage,
    step,
    setStep,
    handleNextStep,
    handlePrevStep,
    current,
    setSelectedTags,
    setImagePreview,
    setFeaturedImage,
  } = useBlog();

  const router = useRouter();
  const searchParams = useSearchParams();

  // Function to update the URL with the current step
  const updateStepInURL = (stepNumber) => {
    // Push the step to the query parameter 'step'
    router.push(`/blog/create?step=${stepNumber}`);
  };

  // Update the step in the URL whenever it changes
  useEffect(() => {
    updateStepInURL(step);
  }, [step]);

  // brought forward from components/blog/create/Tags.js
  useEffect(() => {
    const storedTags = JSON.parse(localStorage.getItem("selectedTags")) || [];
    setSelectedTags(storedTags);
  }, []);

  // brought forward from components/blog/create/FeaturedImage.js
  useEffect(() => {
    const storedImagePreview = localStorage.getItem("imagePreview");
    const storedImageUrl = localStorage.getItem("featuredImage");

    if (storedImagePreview) {
      setImagePreview(storedImagePreview);
    }

    if (storedImageUrl) {
      setFeaturedImage(storedImageUrl);
    }
  }, []);

  // Function to initialize the step from the query parameter on page load
  const initializeStepFromQuery = () => {
    const stepFromQuery = searchParams.get("step");
    if (stepFromQuery !== null) {
      const stepNumber = parseInt(stepFromQuery, 10);
      if (!isNaN(stepNumber)) {
        setStep(stepNumber);
      }
    }
  };

  // Initialize the step from the query parameter when the component mounts
  useEffect(() => {
    initializeStepFromQuery();
  }, []);

  return (
    <div className="container-fluid">
      {/* steps */}
      <div className="container my-5">
        <div className="d-flex justify-content-between lead pointer">
          <div onClick={() => setStep(1)}>
            {current(1, title?.trim())} Blog Title
          </div>
          <div onClick={() => setStep(2)}>
            {current(2, markdown?.trim().length > 60)} Blog Content
          </div>
          <div onClick={() => setStep(3)}>
            {current(3, selectedTags?.length > 0)} Tags
          </div>
          <div onClick={() => setStep(4)}>
            {current(4, featuredImage)} Featured Image
          </div>
          <div onClick={() => setStep(5)}>{current(5)} Review and Submit</div>
        </div>
      </div>

      {step === 1 && <BlogTitle onNextStep={handleNextStep} />}
      {step === 2 && (
        <BlogContent onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
      )}
      {step === 3 && (
        <Tags onNextStep={handleNextStep} onPrevStep={handlePrevStep} />
      )}
      {step === 4 && (
        <FeaturedImage
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
        />
      )}
      {step === 5 && <ReviewAndSubmit onPrevStep={handlePrevStep} />}
    </div>
  );
}
