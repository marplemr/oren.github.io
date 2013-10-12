I wanted to share a refactor we did for the notes page.
There are 4 actions in this page (so far) - delete a note, edit a note, cancel editing and update note.

Here is the jQuery version:

```jade
mixin note(note, opts)
    article(data-note-id=note.id)
        header
            - if (!opts.editable)
                h1
                    = note.businessName
                    span= note.collection
            h2
                = note.date
                - if (opts.editable)
                    a.edit-note(href="#") Edit
                    a(href="#", class="delete-note") Delete
        p.content
            = note.content

    form.edit-notes
        .editing
            label
                textarea(name='edit-note')
                    = note.content

            a.save(href='#') Save
            a.cancel(href='#') Cancel
```

```js
'use strict';

/*globals $*/

var deleteNote = require('./mybook/deleteNote');
var editNote = require('./mybook/editNote');

function setup() {
    $('.add-note').on('click', 'label.default', function (e) {
        var $this = $(e.currentTarget);
        var $pair = $this.next('.adding');

        $this.toggle();
        $pair.toggle();
    });

    $('.add-note').on('click', 'a.cancel', function (e) {
        var $this = $(e.currentTarget).parents('.adding');
        var $pair = $this.prev('label.default');

        $this.toggle();
        $pair.toggle();
    });

    $('.add-note').on('click', '.save', function (e) {
        var $form = $(e.delegateTarget);

        $form.trigger('submit');

        return false;
    });

    $('.notes').on('click', '.edit-note', function (e) {
        var $this = $(e.currentTarget);
        var $readOnly = $this.parents('article:first');
        var $edit = $this.parents('.notes').find('.edit-notes');

        $readOnly.toggle();
        $edit.toggle();
    });

    $('.edit-notes').on('click', '.cancel-note', function (e) {
        var $this = $(e.currentTarget);
        var $readOnly = $this.parents('.edit-notes').prev();
        var $edit = $this.parents('.edit-notes');

        $readOnly.toggle();
        $edit.toggle();
    });

    $('.edit-notes').on('click', '.save-note', function (e) {
        var $this = $(e.currentTarget);
        var $note = $(e.currentTarget).parents('[data-note-id]');
        var noteId = $note.data('note-id');
        var content = $this.parent().find('[name=edit-note]').val();

        function onSuccess(err, res) {
            if (err) { return console.error(err); }

            void(res);
        }

        editNote(noteId, content, onSuccess);
        return false;
    });

    $('.notes').on('click', '.delete-note', function (e) {
        var $note = $(e.currentTarget).parents('[data-note-id]');
        var noteId = $note.data('note-id');

        function onSuccess(err, res) {
            if (err) { return console.error(err); }

            void(res);
            $note.remove();
        }

        deleteNote(noteId, onSuccess);
    });
}

$(setup);
```

And here is the same code but Using AngularJS:

```jade
mixin note(note, opts)
    .note-widget(ng-controller='NotesController', ng-hide='deleted')
        article(ng-hide='editing', ng-init='noteID=#{JSON.stringify(note.id)}')
            header
                - if (!opts.editable)
                    h1
                        = note.businessName
                        span= note.collection
                h2
                    = note.date
                    - if (opts.editable)
                        a.edit-note(href='#', ng-click='edit()') Edit
                        a(href='#', ng-click='destroy()', class='delete-note') Delete

            p.content(ng-bind='content', ng-init='content=#{JSON.stringify(note.content)}')

        form.edit-notes(ng-show='editing', style='display: none')
            .editing
                label
                    textarea(name='edit-note', ng-model='content')

                a.save(href='#', ng-click='save()') Save
                a.cancel(href='#', ng-click='cancel()') Cancel
```

```js
'use strict';

/*globals confirm, window*/

var deleteNote = require('./delete_note');
var editNote = require('./edit_note');

function NotesController($scope) {
    $scope.edit = function () {
        $scope.editing = true;
    };

    $scope.cancel = function () {
        $scope.editing = false;
    };

    $scope.destroy = function () {
        if (confirm('Are you sure?')) {
            $scope.deleted = true;

            deleteNote($scope.noteID);
        }
    };

    $scope.save = function () {
        $scope.editing = false;

        editNote($scope.noteID, $scope.content);
    };

    $scope.editing = false;
}

module.exports = NotesController;
```

And the Ractive.js version:

```html
<section class="notes">
    <form action="post">

        {{^adding}}
        <label class="default">
            <input type="text" placeholder="Add a note..." proxy-click="add">
        </label>
        {{/adding}}

        {{#adding}}
            <div class="adding">
                <label>
                    <textarea name="content" value="{{ note.content }}" autofocus></textarea>
                </label>

                <button class="save" type="submit">Save</button>

                <a class="cancel" href="#cancelAdd" proxy-click="cancelAdd">Cancel</a>
            </div>
        {{/adding}}
    </form>
</section>
```

```js
'use strict';

var editNote = require('./edit_note');
var deleteNote = require('./delete_note');

var Notes = Ractive.extend({
    template: fs.readFileSync(__dirname + '/../../templates/notes.html'),

    setNote: function (idx, attr, value) {
        var key = format('notes.%s.%s', idx, attr);

        return this.set(key, value);
    },

    getNote: function (idx, attr) {
        var key = format('notes.%s.%s', idx, attr);

        return this.get(key);
    },

    init: function () {
        this.set('enableShowMore', this.get('notes').length > 1);

        this.on({
            'add': function () {
                this.set('adding', true);
            },

            'cancelAdd': function (event) {
                preventDefault(event);

                this.set({
                    'note.content': '',
                    'adding': false
                });
            },

            'toggleEdit': function (event, idx) {
                preventDefault(event);

                this.setNote(idx, 'editing', !this.getNote(idx, 'editing'));
            },

            'delete': function (event, idx) {
                var self = this;

                preventDefault(event);

                if (confirm('Are you sure?')) {
                    deleteNote(self.getNote(idx, 'note.ts')).then(function () {
                        self.sliceNote(idx);
                    });
                }
            }
        });
    }
});

module.exports = Notes;
```
