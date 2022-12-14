import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const SignOut = () => {
	const [isOpen, setIsOpen] = useState(false);
	const signOutHandler = () => {
		signOut(auth);
	};

	useEffect(() => {
		const closeDropDown = e => {
			if (!isOpen) return;
			const btnLogoutClick = e.target.closest(".btn-logout");
			if (!btnLogoutClick) setIsOpen(false);
			//////////////////////////////////////
			// Old way and there is a bug
			// if (e.path[0].tagName !== "BUTTON") {
			// 	console.log("in");
			// 	setIsOpen(false);
			// }
		};
		document.body.addEventListener("click", closeDropDown);

		return () => document.body.removeEventListener("click", closeDropDown);
	}, [isOpen]);

	return (
		<div className="relative">
			<button
				onClick={() => setIsOpen(prevState => !prevState)}
				className={`btn-logout flex items-center justify-center rounded-lg  bg-gray-100 px-3 py-2 text-base font-semibold  text-gray-600 transition-all hover:scale-[1.03] focus:outline-none  focus:ring active:scale-95 dark:bg-gray-600 dark:text-gray-100 dark:focus:ring-gray-400`}
			>
				{auth.currentUser.displayName.split(" ")[0]}
			</button>
			<button
				onClick={signOutHandler}
				className={`btn-logout absolute top-12 left-[50%] w-full -translate-x-[50%] rounded-lg bg-red-600 px-3 text-sm  font-medium text-gray-100 shadow-lg transition-all focus:outline-none focus:ring dark:focus:ring-gray-300 ${
					isOpen
						? "pointer-events-auto visible h-8 opacity-100"
						: "pointer-events-none invisible h-0 opacity-0"
				}`}
			>
				Logout
			</button>
		</div>
	);
};

export default SignOut;
