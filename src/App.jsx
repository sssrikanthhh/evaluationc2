import { useState } from 'react';
import { AddStudent } from './components/AddStudent';
import { ShowStudents } from './components/ShowStudents';
import './App.css';

function App() {
	const [showDash, setShowDash] = useState(true);

	return (
		<div className='App'>
			<button className='togglebtn' onClick={() => setShowDash(!showDash)}>
				{showDash ? 'Add student' : 'show students'}
			</button>
			{/* Show either  AddStudent component or ShowStudents dependeing on the above button click  */}
			{/* make sure the table is shown initially, do not show form initially */}
			{/* make sure to show either of them do not both together */}
			{showDash ? <ShowStudents /> : <AddStudent />}
		</div>
	);
}

export default App;
