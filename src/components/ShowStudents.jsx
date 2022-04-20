import { useState, useEffect } from 'react';

export const ShowStudents = () => {
	const [students, setStudents] = useState([]);
	const [sortOpt, setSortOpt] = useState({});
	const [sortData, setSortData] = useState([]);

	useEffect(() => {
		fetchStudents();
	}, []);

	const fetchStudents = async () => {
		const res = await fetch('http://localhost:8080/students');
		const data = await res.json();
		setStudents(data);
		setStudents(prev => [
			...prev.sort((a, b) => {
				let fa = a.first_name.toLowerCase();
				let fb = b.first_name.toLowerCase();

				if (fa < fb) {
					return -1;
				}
				if (fa > fb) {
					return 1;
				}
				return 0;
			}),
		]);
	};

	const handleOpt = e => {
		const { name, value } = e.target;
		setSortOpt({
			...sortOpt,
			[name]: value,
		});
	};

	const handleSort = () => {
		const { val, type } = sortOpt;
		if (val === 'age' && type === 'asc') {
			setStudents(prev => [...prev.sort((a, b) => a.age - b.age)]);
		} else if (val === 'age' && type === 'desc') {
			setStudents(prev => [...prev.sort((a, b) => b.age - a.age)]);
		} else if (val === 'tenth_score' && type === 'asc') {
			setStudents(prev => [
				...prev.sort((a, b) => a.tenth_score - b.tenth_score),
			]);
		} else if (val === 'tenth_score' && type === 'desc') {
			setStudents(prev => [
				...prev.sort((a, b) => b.tenth_score - a.tenth_score),
			]);
		} else if (val === 'twelth_score' && type === 'asc') {
			setStudents(prev => [
				...prev.sort((a, b) => a.twelth_score - b.twelth_score),
			]);
		} else if (val === 'twelth_score' && type === 'desc') {
			setStudents(prev => [
				...prev.sort((a, b) => b.twelth_score - a.twelth_score),
			]);
		} else if (val === 'gender' && type === 'asc') {
			setStudents(prev => [
				...prev.sort((a, b) => {
					let fa = a.gender;
					let fb = b.gender;
					if (fa < fb) {
						return -1;
					}
					if (fa > fb) {
						return 1;
					}
					return 0;
				}),
			]);
		} else if (val === 'gender' && type === 'desc') {
			setStudents(prev => [
				...prev.sort((a, b) => {
					let fa = a.gender;
					let fb = b.gender;
					if (fa < fb) {
						return 1;
					}
					if (fa > fb) {
						return -1;
					}
					return 0;
				}),
			]);
		}
	};

	return (
		<div>
			<div className='controls'>
				<div>
					Sort By:{' '}
					<select
						// select dropdown needs both value and onChange
						className='sortby'
						name='val'
						value={sortOpt.val}
						onChange={handleOpt}
					>
						<option value='first_name'>First Name</option>
						<option value='gender'>Gender</option>
						<option value='age'>Age</option>
						<option value='tenth_score'>10th Score</option>
						<option value='twelth_score'>12th Score</option>
					</select>
				</div>
				<div>
					Order:
					<select
						// select dropdown needs both value and onChange
						className='sortorder'
						name='type'
						value={sortOpt.type}
						onChange={handleOpt}
					>
						<option value='asc'>Ascending</option>
						<option value='desc'>Descending</option>
					</select>
				</div>
				<button
					className='sort'
					onClick={() => {
						handleSort();
					}}
				>
					sort
				</button>
			</div>
			<table className='table'>
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Gender</th>
						<th>Age</th>
						<th>10th Score</th>
						<th>12th Score</th>
						<th>Branch</th>
					</tr>
				</thead>
				<tbody className='tbody'>
					{/* populate all rows like below: */}
					{students.map(stu => (
						<tr key={stu.id} className='row'>
							<td className='first_name'>{stu.first_name}</td>
							<td className='last_name'>{stu.last_name}</td>
							<td className='email'>{stu.email}</td>
							<td className='gender'>{stu.gender}</td>
							<td className='age'>{stu.age}</td>
							<td className='tenth_score'>{stu.tenth_score}</td>
							<td className='twelth_score'>{stu.twelth_score}</td>
							<td className='preferred_branch'>{stu.preferred_branch}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
