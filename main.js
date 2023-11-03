import {DataTypes, Sequelize} from "sequelize";
import { faker } from '@faker-js/faker';

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST ?? 'localhost',
	dialect: 'mysql'
});

async function dbConnect() {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

function insertProjects() {
	dbConnect().then(() => {
		const project = sequelize.define("project", {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
		}, {
			timestamps: false,
		})
		project.create({
			name: faker.word.noun({length: 10})
		}).then(() => {
			sequelize.close().then(() => {
				console.log('Connection has been closed');
			})
		})
	});
}
function insertBoards() {
	dbConnect().then(() => {
		const project = sequelize.define("boards", {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			project_id: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
		}, {
			timestamps: false,
		})
		project.create({
			name: faker.hacker.noun(),
			project_id: faker.number.int({min: 1, max: 4})
		}).then(() => {
			sequelize.close().then(() => {
				console.log('Connection has been closed');
			})
		})
	});
}

insertProjects()
insertBoards()
