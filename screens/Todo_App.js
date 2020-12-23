import * as React from 'react';
import  { useEffect } from 'react';
import ButtonIcon from '../components/ButtonIcon';

import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { Title, Paragraph, Card, Button, TextInput } from 'react-native-paper';

import { connect } from 'react-redux';
import { addTodo, deleteTodo,updateTodo} from '../redux/actions';
import { LogBox } from 'react-native';
import {
  Keyboard
} from "react-native";



const Todo_App = ({ todo_list, addTodo, deleteTodo,updateTodo}) => {
  const [task, setTask] = React.useState('');
  const [editingItem, setEditingItem] = React.useState(0);

  const handleAddTodo = () => {
    addTodo(task)
    setTask('')
    Keyboard.dismiss();
  }

  const handleDeleteTodo = (id) => {
    deleteTodo(id)
  }

  const handleModifyTodo = (item) => {
    setTask(item.task);
    setEditingItem(item.id);
  }

  const handleUpdateTodo = () => {
    updateTodo(task,editingItem)
    setTask('');
    setEditingItem(0);
    Keyboard.dismiss();
  }

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
}, [])

  return (
    <View style={styles.container}>
      <Card title="Card Title">
        <Text style={styles.paragraph}>ToDo App</Text>
      </Card>
      <Card style={styles.space}>
        <Card.Content>
          <Title>Add ToDo Here</Title>
          
          <TextInput
            mode="outlined"
            label="Task"
            onChangeText={task => setTask(task)}
            value={task}

          />
          <View style={styles.space} />
          <Button mode="contained" onPress={editingItem === 0 ? handleAddTodo : handleUpdateTodo}>
          {editingItem === 0 ? "ADD TODO" : "UPDATE TODO"}
          </Button>
        </Card.Content>
      </Card>
      
      <FlatList
        data={todo_list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item, index}) => {
          return (
            <>
            <Card style={styles.space}> 
              <Card.Title style={styles.card}
                title={'                  Task               '}
                //left={(props) => <Icon name="tasks" size={24} color="black" />}
                left={(props) => <ButtonIcon iconName="edit" color="blue" onPress={() => handleModifyTodo(item)} />}
                right={(props) => <ButtonIcon iconName="close" color="red" onPress={() => handleDeleteTodo(item.id)} />}
              />
              <Card.Content>
                <Paragraph>{item.task}</Paragraph>
              </Card.Content>
            </Card>
            </>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  card: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  space: {
    marginVertical: 15,
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    todo_list: state.todos.todo_list,
  }
}

const mapDispatchToProps = { addTodo, deleteTodo, updateTodo}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todo_App)
