import { useState, useEffect } from 'react';

export const ShowStudents = () => {
	const [students, setStudents] = useState([]);
	const [sortOpt, setSortOpt] = useState({
		val: 'first_name',
		type: 'asc',
	});
	const [sortData, setSortData] = useState([]);

	useEffect(() => {
		fetchStudents();
	}, []);

	const fetchStudents = async () => {
		const res = await fetch('http://localhost:8080/students');
		const data = await res.json();
		setStudents(data);
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
		setSortData(
			students.sort((stu1, stu2) => {
				if (type === 'asc') {
					return stu1[val] - stu2[val];
				} else if (type === 'desc') {
					return stu2[val] - stu1[val];
				}
			})
		);
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
				<button className='sort' onClick={handleSort}>
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
					{sortData.length > 0
						? sortData.map(stu => (
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
						  ))
						: students.map(stu => (
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
