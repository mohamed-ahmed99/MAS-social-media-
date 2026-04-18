import { HiArrowRight, HiArrowLeft, HiCheck } from 'react-icons/hi';
import GeneralBtn from '../../../components/btns/GeneralBtn';

const NavigationControls = ({ step, totalSteps, handleNext, handleBack }) => {
  return (
    <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-50">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all text-sm ${
                step === 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <HiArrowLeft />
              Back
            </button>

            {/* next and skip buttons */}
            <div className="flex gap-3 items-center">
              {step < totalSteps ? (
                <>
                  <button 
                    onClick={handleNext}
                    className="text-gray-400 hover:text-gray-600 px-3 text-sm font-bold transition-colors"
                  >
                    Skip
                  </button>
                  <div className="w-32">
                    <GeneralBtn
                      onClick={handleNext}
                      variant="black"
                      className="!p-2 text-sm h-11"
                    >
                      Next <HiArrowRight />
                    </GeneralBtn>
                  </div>
                </>
              ) : (
                <div className="w-40">
                  <GeneralBtn
                    onClick={() => alert('Onboarding Finished!')}
                    variant="black"
                    className="bg-black text-white !p-2 text-sm h-11"
                  >
                    Finish <HiCheck />
                  </GeneralBtn>
                </div>
              )}
            </div>
          </div>
  );
};

export default NavigationControls;