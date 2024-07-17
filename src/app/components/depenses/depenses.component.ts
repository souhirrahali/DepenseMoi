import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Depense, DepenseService } from 'src/app/services/depense.service';

@Component({
  selector: 'app-depenses',
  templateUrl: './depenses.component.html',
  styleUrls: ['./depenses.component.css']
})
export class DepensesComponent implements OnInit {
  depenses: Depense[] = [];
  depenseForm: FormGroup;
  editingDepenseId: number | null = null;
  listOfCategorie:any[]=[
    "Logement",
    "Education",
    "Nouriture",
    "Transport",
    "Habillement",
    "Soins et santé",
    "Loisir",
    "Epargne",
    "autres"
  ];

  constructor(
    private depenseService: DepenseService,
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.depenseForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      categorie: ['', Validators.required],
      date: ['', Validators.required],
      montant: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    if (!this.authService.currentUserValue) {
      this.router.navigate(['/login']);
    } else {
      this.getAllDepenses();
    }
  }

  getAllDepenses() {
    this.depenseService.getAllDepenses(this.authService.currentUserEmail).subscribe(
      (data: Depense[]) => {
        this.depenses = data;
        console.log('Dépenses chargées:', this.depenses);
      },
      (error) => {
        console.error('Erreur lors du chargement des dépenses', error);
      }
    );
  }

  onSubmit() {
    if (this.depenseForm.valid) {
      if (this.editingDepenseId) {
        this.updateDepense();
      } else {
        this.addDepense();
      }
    }
  }

  addDepense() {
    this.depenseService.addDepense(this.depenseForm.value).subscribe(
      (response) => {
        console.log('Dépense ajoutée', response);
        this.getAllDepenses();
        this.depenseForm.reset();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la dépense', error);
      }
    );
  }

  updateDepense() {
    if (this.editingDepenseId) {
      this.depenseService.updateDepense(this.editingDepenseId, this.depenseForm.value).subscribe(
        (response) => {
          console.log('Dépense mise à jour', response);
          this.getAllDepenses();
          this.depenseForm.reset();
          this.editingDepenseId = null;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la dépense', error);
        }
      );
    }
  }

  editDepense(depense: Depense) {
    this.editingDepenseId = depense.id;
    this.depenseForm.patchValue({
      titre: depense.titre,
      description: depense.description,
      categorie: depense.categorie,
      date: depense.date,
      montant: depense.montant
    });
  }

  cancelEdit() {
    this.editingDepenseId = null;
    this.depenseForm.reset();
  }

  deleteDepense(id: number) {
    this.depenseService.deleteDepense(id).subscribe(
      () => {
        console.log('Dépense supprimée');
        this.getAllDepenses();
      },
      (error) => {
        console.error('Erreur lors de la suppression de la dépense', error);
      }
    );
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}