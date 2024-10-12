"use client";

import { useState, useEffect } from 'react';
import styles from "./themebtn.module.css"; 


export default function ThemeToggle() {

	const [darkTheme, setDarkTheme] = useState<boolean|null>(false);

	useEffect(() => {
		const theme = localStorage.getItem('theme');
		if (theme === 'dark') {
			setDarkTheme(true);
		} else {
			setDarkTheme(false);
		}
	}, []);

	useEffect(() => {
		if (darkTheme) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
			// window.location.reload();
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [darkTheme]);

	return (
		<div className="inline-block" style={{ 'transform': 'scale(0.68)'}}>
			<label className={`${styles.switch}`}>
				<input type="checkbox" onClick={() => setDarkTheme(!darkTheme)} />
				<span className={`${styles.slider}`}>
					<svg className={`${styles.slider_icon}`} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation"><path fill="none" d="m4 16.5 8 8 16-16"></path></svg> 
				</span>
			</label>
		</div>
	);
};
