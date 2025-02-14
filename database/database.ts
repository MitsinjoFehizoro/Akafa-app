import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import migrations from './model/migrations'
import schema from './model/schema'

const adapter = new SQLiteAdapter({
	schema,
	migrations,
	jsi: true, //pour une bonne performance
	onSetUpError: error => {
		console.error("Erreur d'initialisation de la base de données :", error);
	}
})

const database = new Database({
	adapter,
	modelClasses: [],
})