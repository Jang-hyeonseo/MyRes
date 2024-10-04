
        const terrarium = document.getElementById('terrarium');
        const plants = document.querySelectorAll('.plant');
        let draggedPlant = null;

        plants.forEach(plant => {
            plant.addEventListener('dragstart', dragStart);
            plant.addEventListener('dragend', dragEnd);
        });

        terrarium.addEventListener('dragover', dragOver);
        terrarium.addEventListener('dragleave', dragLeave);
        terrarium.addEventListener('drop', drop);

        function dragStart(e) {
            draggedPlant = e.target;
            setTimeout(() => (draggedPlant.style.display = 'none'), 0);
        }

        function dragEnd() {
            draggedPlant.style.display = 'block';
            draggedPlant = null;
        }

        function dragOver(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        }

        function dragLeave() {
            this.classList.remove('drag-over');
        }

        function drop(e) {
            e.preventDefault();
            this.classList.remove('drag-over');

            if (!this.contains(draggedPlant)) {
                const newPlant = draggedPlant.cloneNode(true);
                newPlant.style.position = 'absolute';
                placePlant(newPlant, e.clientX, e.clientY);
                newPlant.addEventListener('mousedown', startDragging);
                this.appendChild(newPlant);
            } else {
                placePlant(draggedPlant, e.clientX, e.clientY);
            }
        }

        function placePlant(plant, x, y) {
            const rect = terrarium.getBoundingClientRect();
            const dirtHeight = 40;
            const dirtTopBoundary = rect.height - dirtHeight; 
        
            let left = x - rect.left - plant.width / 2;
            let top = y - rect.top - plant.height;
        
            left = Math.max(0, Math.min(left, rect.width - plant.width));
        
            top = Math.min(top, dirtTopBoundary - plant.height);
        
            plant.style.left = `${left}px`;
            plant.style.top = `${500+top}px`;
        }

        function startDragging(e) {
            const plant = e.target;
            let startX = e.clientX - plant.offsetLeft;
            let startY = e.clientY - plant.offsetTop;

            function moveAt(pageX, pageY) {
                placePlant(plant, pageX, pageY);
            }

            function onMouseMove(e) {
                moveAt(e.pageX, e.pageY);
            }

            document.addEventListener('mousemove', onMouseMove);

            plant.onmouseup = function() {
                document.removeEventListener('mousemove', onMouseMove);
                plant.onmouseup = null;
            };
        }