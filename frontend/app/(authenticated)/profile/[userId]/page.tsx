"use client";
import Event from "@/components/Event";
import apiClient from "@/lib/apiClient";
import { PencilSquareIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import { profile } from "console";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Profile = {
  user_profile_id: number;
  name: string;
  profile_icon_url: string;
  student_type: string;
  introduce_text: string;
  major: string;
  year: number;
  school_name: string;
};

type User = {
  user_id: number;
  email: string;
  event_id: string;
  profile: Profile;
};

export default function ProfilePage() {
  const [name, setName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [profileIconUrl, setProfileIconUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await apiClient.get(`/users/${userId}`);
        console.log(response);
        const { profile } = response.data as { profile: Profile };
        setName(profile.name);
        setSchoolName(profile.introduce_text);
        setProfileIconUrl(profile.profile_icon_url);
        console.log(profile);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("ユーザー情報を取得できませんでした。");
      }
    };

    fetchUserData();
  }, [userId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileIconUrl(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <div className="relative  flex flex-col items-center space-y-6">
        <div className="rounded-full overflow-hidden w-40 h-40 bg-slate-200">
          <div
            style={{ backgroundImage: `url(${profileIconUrl})` }}
            className="bg-cover bg-center w-full h-full relative"
          >
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="opacity-0 absolute inset-0 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col items-start w-1/2">
          <label className="text-lg font-bold" htmlFor="username">
            名前
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="username"
            className="border p-2 rounded w-full mt-2"
            readOnly={!isEditing}
          />
        </div>

        <div className="flex flex-col items-start w-1/2">
          <label className="text-lg font-bold" htmlFor="bio">
            大学名
          </label>
          <textarea
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            id="bio"
            className="border p-2 rounded w-full mt-2"
            readOnly={!isEditing}
          />
        </div>
      </div>

      <div className="">
        <PencilSquareIcon
          className="h-10 w-10 m-auto absolute  right-12 md:right-24 "
          onClick={() => setIsEditing(!isEditing)}
        />
      </div>

      <div className="mt-20">
        <h2 className="text-xl font-bold mb-4">参加中のイベント</h2>
        <Event
          key={1}
          id={1}
          image={"/next.svg"}
          date={"12月12"}
          title={"イベントタイトル"}
          time={"12"}
          venue={"会場"}
          currentParticipants={12}
          maxParticipants={20}
        />
      </div>
    </div>
  );
}
