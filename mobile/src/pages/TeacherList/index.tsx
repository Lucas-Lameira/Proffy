import React, { useState } from 'react';
import { View, ScrollView, Text, TextComponent,  } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage' 


import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';
import api from '../../services/api';


function TeacherList () {
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');
    
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [isFilter, setIsFilter] = useState(false);

    function handleToggleIsFilter () {
        setIsFilter(!isFilter);
    }

    async function handleSubmit () {
        loadFavorites()
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        })

        setIsFilter(false);

        setTeachers(response.data);    
    }

    function loadFavorites () {
        AsyncStorage.getItem('favorites').then(response => {
            if(response){

                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                });
                setFavorites(favoritedTeachersIds)
            }
        })
    }

    

    return (
        <View style={styles.container}>
            <PageHeader 
              title="Proffys Disponíveis"
              headerRight={(
                  <BorderlessButton onPress={handleToggleIsFilter}>
                      <Feather name="filter" size={25} color="#FFF"/>
                  </BorderlessButton>
              )}  
            >
                {isFilter && (
                    <View style={styles.searchForm} >
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput 
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual o Matéria?"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Hora</Text>
                                <TextInput 
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual o Horário?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>                            
                        </View>
                        <RectButton onPress={handleSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}   
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}             
            >

                {teachers.map((teacher: Teacher) =>{
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher} 
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
                                                
            </ScrollView>
        </View>
    )

}

export default TeacherList;