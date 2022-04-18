import { useState, useEffect } from 'react';

export const AddStudent = () => {
	const [student, setStudent] = useState({
		first_name: '',
		last_name: '',
		email: '',
		gender: '',
		age: null,
		tenth_score: null,
		twelth_score: null,
		preferred_branch: '',
	});

	const [error, setError] = useState('');

	const handleChange = e => {
		const { name, value } = e.target;
		setStudent({
			...student,
			[name]: value,
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		let keys = Object.keys(student);
		for (let item of keys) {
			if (student[item] === null || student[item].trim() === '') {
				setError(`${item} is missing`);
			}
		}
		if (error) {
			await fetch('http://localhost:8080/students', {
				method: 'POST',
				headers: {
					// Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(student),
			});
		}
	};

	return (
		<form className='addstudent' onSubmit={handleSubmit}>
			<h2>Add student</h2>
			<div>
				Firstname:{' '}
				<input
					type='text'
					name='first_name'
					className='first_name'
					placeholder='enter first name'
					onChange={handleChange}
				/>
			</div>
			<div>
				{' '}
				Last Name:
				<input
					type='text'
					name='last_name'
					className='last_name'
					placeholder='enter last name'
					onChange={handleChange}
				/>
			</div>
			<div>
				{' '}
				Email:
				<input
					type='email'
					name='email'
					className='email'
					placeholder='enter email'
					onChange={handleChange}
				/>
			</div>

			<div>
				Gender: {/* NOTE: radio boxes only work when they have same `name`. */}
				<div>
					Male
					<input
						name='gender'
						className='male'
						type='radio'
						value={'male'}
						onChange={handleChange}
					/>{' '}
					Female{' '}
					<input
						name='gender'
						className='female'
						type='radio'
						value={'female'}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div>
				Age{' '}
				<input
					type='number'
					name='age'
					className='age'
					placeholder='enter age'
					onChange={handleChange}
				/>
			</div>
			<div>
				Tenth Score:{' '}
				<input
					type='number'
					name='tenth_score'
					className='tenth_score'
					placeholder='enter 10th score'
					onChange={handleChange}
				/>{' '}
			</div>
			<div>
				Twelth Score:{' '}
				<input
					type='number'
					name='twelth_score'
					className='twelth_score'
					placeholder='enter 12th score'
					onChange={handleChange}
				/>{' '}
			</div>
			<div>
				<select
					// select dropdown needs both value and onChange attributes
					name='preferred_branch'
					className='preferred_branch'
					value={student.preferred_branch}
					onChange={handleChange}
				>
					<option value='law'>law</option>
					<option value='commerce'>commerce</option>
					<option value='science'>science</option>
					<option value='sports'>sports</option>
					<option value='arts'>arts</option>
					<option value='acting'>acting</option>
				</select>
			</div>

			<input className='submit' type='submit' value='Submit' />
			{
				error ? <div className='error'>{error}</div> : null
				// show this div with proper error before submitting form, if there's anything not provided
				// eg: first name missing, age cannot be greater than 100 etc
			}
		</form>
	);
};
