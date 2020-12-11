# project2

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Used Features:

vue-resizable

vuex

vue-router


### todo list:

1. props validation

2. bem strategy shoul be implemented

3. pure components should start from Base/App/V prefix

4. unic and non-repeatable components should start from The prefix

5. child components should include parent component name as a prefix

6. ClearSearchButton.vue - wrong, SearchButtonClear.vue - correct

7. props inside child component should be CamelCase, in parent html structure - in kebab-case (applicable only for props)

8. Best practices for Vuex

9. Elements with several arguments should be on new line each

10. make minimum computed properties inside html elements, instead, compute in computed properties inside component and put the result to html

11. options sequence inside component: 
	
	Local state:
	- data
	- computed

	Reactive events callbacks:
	- watch

	Life cycle events
	- beforeCreate
	- created
	- beforeMout
	- mounted
	- beforeUpdate
	- updated
	- activated
	- deactivated
	- beforeDestroy
	- destroyed

	Non-reactive properties:
	- methods

12. Attributes sequence:
	
	is, v-for, if/v-else-if/v-else/v-show/v-cloak, v-pre/v-once, id, ref/key, v-model, other, v-on, v-html/v-text

14. empty string between options when code does't fit on display

15. don't use scoped-option with teg-selectors (body, buttons, table, form, e.t.c.)

16. make interesting styles according to data visualisation

17. buttons for block manipulating should appear after removing and adding in correct order

18. pressed button for block manipulating should accept color of the moving block

19. make several sections that demonstrate different data visualization approaches

20. grid mast have vertical and horizontal coordinates (V), which will illuminates when block achives the line


