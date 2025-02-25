import React from "react";

export const Profile: React.FC = () => {
  return (
    <div className="flex overflow-hidden flex-wrap gap-10 pr-10 bg-stone-50 max-md:pr-5">
      <div className="flex flex-col pt-40 bg-white pb-[807px] max-md:hidden max-md:py-24">
        <div className="flex shrink-0 h-[58px]" />
      </div>
      <div className="flex flex-col grow shrink-0 my-auto basis-0 w-fit max-md:max-w-full">
        <div className="flex flex-col pb-16 mt-8 text-black bg-white rounded-xl max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1477984db24b2cdbe3d310c457f05e141f0519c4ce927b8da96e133d9fd04bbd?placeholderIfAbsent=true&apiKey=0c497a4840ef4fd8a4e292fd63a27c16"
            className="object-contain w-full rounded-none aspect-[12.82] max-md:max-w-full"
          />
          <div className="flex flex-col px-8 mt-8 w-full max-md:px-5 max-md:max-w-full">
            <div className="flex flex-wrap gap-5 justify-between max-md:max-w-full">
              <div className="flex flex-col">
                <div className="flex gap-5 justify-between">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/49eafb1668dc68d7e7b0260dfed0f21a68f3ce5029f1f6c25cd05401e910be92?placeholderIfAbsent=true&apiKey=0c497a4840ef4fd8a4e292fd63a27c16"
                    className="object-contain shrink-0 max-w-full rounded-full aspect-square w-[100px]"
                  />
                  <div className="flex flex-col my-auto">
                    <div className="self-start text-xl font-medium">
                      Alexa Rawles
                    </div>
                    <div className="mt-1.5 text-base">
                      alexarawles@gmail.com
                    </div>
                  </div>
                </div>
                <div className="self-start mt-8 text-base">Full Name</div>
              </div>
              <div className="self-end mt-32 text-base max-md:mt-10">
                Nick Name
              </div>
              <div className="self-start px-8 py-2.5 mt-7 text-base text-black whitespace-nowrap bg-blue-500 rounded-lg max-md:px-5">
                Edit
              </div>
            </div>
            <div className="flex flex-wrap gap-8 mt-3 text-base max-md:max-w-full">
              <div className="grow px-5 py-3.5 rounded-lg bg-stone-50 w-fit max-md:max-w-full">
                Your First Name
              </div>
              <div className="grow px-5 py-3.5 rounded-lg bg-stone-50 w-fit max-md:max-w-full">
                Your First Name
              </div>
            </div>
            <div className="flex flex-wrap gap-8 mt-6 text-base max-md:max-w-full">
              <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit max-md:max-w-full">
                <div className="self-start">Gender</div>
                <div className="px-5 py-3.5 mt-3 rounded-lg bg-stone-50 max-md:max-w-full">
                  Your First Name
                </div>
              </div>
              <div className="flex flex-col flex-1 grow shrink-0 basis-0 w-fit max-md:max-w-full">
                <div className="self-start">Country</div>
                <div className="px-5 py-3.5 mt-3 rounded-lg bg-stone-50 max-md:max-w-full">
                  Your First Name
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-5 justify-between mt-6 max-w-full text-base w-[708px]">
              <div>Language</div>
              <div>Time Zone</div>
            </div>
            <div className="flex flex-wrap gap-8 mt-3 text-base max-md:max-w-full">
              <div className="grow px-5 py-3.5 rounded-lg bg-stone-50 w-fit max-md:max-w-full">
                Your First Name
              </div>
              <div className="grow px-5 py-3.5 rounded-lg bg-stone-50 w-fit max-md:max-w-full">
                Your First Name
              </div>
            </div>
            <div className="self-start mt-8 text-lg font-medium">
              My email Address
            </div>
            <div className="flex gap-5 self-start mt-5 text-base">
              <div className="flex shrink-0 self-start w-12 h-12 bg-blue-500 rounded-full" />
              <div className="flex flex-col">
                <div>alexarawles@gmail.com</div>
                <div className="self-start mt-1.5">1 month ago</div>
              </div>
            </div>
            <div className="self-start px-6 py-2.5 mt-8 text-base text-black bg-blue-500 rounded-lg max-md:px-5">
              +Add Email Address
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
