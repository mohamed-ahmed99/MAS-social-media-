import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import ProfilePreview from './components/ProfilePreview';
import Progress from './Progress';
import NavigationControls from './NavigationControls';
import { usePathMethod } from '../../../hooks/usePatchMethod';

// avatars https://api.dicebear.com
const avatars = [
  "https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Wayfarers&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Angry&mouthType=Sad&skinColor=Light",
  "https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Round&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light",
  "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBigHair&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&clotheColor=Black&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light",
  "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBob&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Black&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light",
  "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads02&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Black&eyeType=Side&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=Light",
  "https://avataaars.io/?avatarStyle=Transparent&topType=LongHairCurvy&accessoriesType=Round&hairColor=Black&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light",
  "https://avataaars.io/?avatarStyle=Transparent&topType=Hijab&accessoriesType=Round&hatColor=Blue03&clotheType=BlazerSweater&eyeType=Close&eyebrowType=SadConcernedNatural&mouthType=ScreamOpen&skinColor=Light",
  "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairTheCaesar&accessoriesType=Sunglasses&hairColor=Brown&facialHairType=BeardMajestic&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Blue02&graphicType=SkullOutline&eyeType=Close&eyebrowType=FlatNatural&mouthType=Twinkle&skinColor=Brown",
  "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairSides&accessoriesType=Wayfarers&hairColor=Brown&facialHairType=BeardMajestic&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=Pink&eyeType=Happy&eyebrowType=DefaultNatural&mouthType=Serious&skinColor=Light",

];
// covers
const covers = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80",
];

const Page = () => {
  // hooks
  const navigate = useNavigate();
  const location = useLocation();
  const {editData, status_e, message_e, data_e, loading_e} = usePathMethod()

  // states
  const [formData, setFormData] = useState({
    profileImage: '',
    coverImage: '',
    bio: '',
    dateOfBirth: '',
  });

  // steps
  const steps = [
    { id: 1, path: 'profile', label: 'Profile' },
    { id: 2, path: 'bio', label: 'Bio' },
    { id: 3, path: 'birth', label: 'Birthday' },
  ];

  // current step
  const currentStepIndex = steps.findIndex(s => location.pathname.includes(s.path)); // find index of current step
  const step = currentStepIndex !== -1 ? currentStepIndex + 1 : 1; // get current step
  const totalSteps = steps.length; // get total steps

  // Redirect to first step if at root /auth/onboarding
  if (location.pathname === '/auth/onboarding' || location.pathname === '/auth/onboarding/') {
    return <Navigate to="profile" replace />;
  }

  // handle next step
  const handleNext = () => {
    if (step < totalSteps) {
      navigate(steps[step].path);
    }
  };

  // handle back step
  const handleBack = () => {
    if (step > 1) {
      navigate(steps[step - 2].path);
    }
  };

  // update form data
  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  // step variants
  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };


  // handle submit
  const handleSubmit = async () => {
    const body = {
      personalInfo: {
        profilePicture: formData.profileImage,
        coverPicture: formData.coverImage,
        bio: formData.bio,
        dateOfBirth: formData.dateOfBirth,
      },
      others: {isOnboardingRouteOpend: true}
    }
    await editData("/api/users/me/update", body)
  }
  
  // handle success
  useEffect(() => {
    if(status_e === "success"){
      navigate("/")
    }else if(status_e === "fail"){
      alert(message_e)
      navigate("/")
    }
  }, [status_e])

  // return
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f5f5f5] flex items-center justify-center p-4 md:p-8 font-sans mt-[70px] md:mt-[100px]">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Left Side: Form Content */}
        <div className="p-8 md:p-10 flex flex-col justify-between min-h-[600px]">
          <div>
            {/* Progress Header */}
            <Progress step={step} totalSteps={totalSteps} steps={steps} />

            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <Outlet context={{ formData, updateFormData, avatars, covers }} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <NavigationControls 
            step={step} 
            totalSteps={totalSteps} 
            handleNext={handleNext} 
            handleBack={handleBack} 
            handleSubmit={handleSubmit}
          />
        </div>

        {/* Right Side: Visual Preview */}
        <div className="hidden lg:flex -translate-y-20 bg-gray-50 p-10 items-center justify-center border-l border-gray-100">
          
          {/* profile preview */}
          <div className="w-full max-w-sm">
            
            {/* header */}
            <div className="mb-8 pl-2 border-l-4 border-black">
              <h3 className="text-xl font-bold text-black uppercase tracking-tight">Profile Preview</h3>
              <p className="text-xs text-gray-500 font-medium">This is how you will appear to others.</p>
            </div>
            
            {/* profile preview */}
            <ProfilePreview formData={formData} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Page;
