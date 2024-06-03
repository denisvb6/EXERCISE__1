import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const [showText, setShowText] = useState(true);

	let isValueVaild = value.length >= 3 ? true : false;
	const onInputButtonClick = () => {
		let promptValue = prompt('Введите значение:');

		//Проверка на случай, если в окне prompt('Введите значение:')
		//нажата кнопка "Отмена"
		try {
			if (promptValue.length >= 3) {
				setValue(promptValue);
				setError('');
			} else {
				setError('Введенное значение должно содержать минимум 3 символа');
				setValue('');
			}
		} catch (e) {
			alert(e);
		}
	};

	const onAddButtonClick = () => {
		if (isValueVaild) {
			let id = Date.now();
			const updatedList = [...list, { id: id, value: value }];

			setList(updatedList);

			setShowText(false);

			setValue('');
			setError('');
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles.pageHeading}>Ввод значения</h1>
			<p className={styles.noMarginText}>
				Текущее значение <code>value</code>: "
				<output className={styles.currentValue}>{value}</output>"
			</p>
			<div className={styles.error}>{error}</div>
			<div className={styles.buttonsContainer}>
				<button onClick={onInputButtonClick} className={styles.button}>
					Ввести новое
				</button>
				<button
					onClick={onAddButtonClick}
					className={styles.button}
					disabled={!isValueVaild}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles.listContainer}>
				<h2 className={styles.listHeading}>Список:</h2>
				{showText && (
					<p className={styles.noMarginText}>Нет добавленных элементов</p>
				)}
				<ul className={styles.list}>
					{list.map(({ id, value }) => (
						<li key={id} className={styles.listItem}>
							{value}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
