
export function NewEntity<T extends {new(...args:any[]):{}}>(entity:T){
	return class extends entity {
		getSql() {
			return 'TESTE DE ENTITY';
        }
	}
}
