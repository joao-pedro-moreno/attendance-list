import React, { useState, useEffect } from 'react'
import './styles.css'
import { Card, CardProps } from '../../components/Card'

type APIResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState<CardProps[]>([])
  const [user, setUser] = useState<User>({} as User)

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
    fetch("https://api.github.com/users/joao-pedro-moreno")
      .then(response => response.json())
      .then((data: APIResponse) => {
        setUser({
          name: data.name,
          avatar: data.avatar_url
        })
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de Perfil" />
        </div>
      </header>

      <input 
        type="text" 
        name="name" 
        id="name" 
        placeholder='Digite o nome...' 
        onChange={e => setStudentName(e.target.value)}
      />
      <button onClick={handleAddStudent}>Adicionar</button>

      {
        students.map(student => <Card key={student.time}  name={student.name} time={student.time} />)
      }
    </div>
  )
}
