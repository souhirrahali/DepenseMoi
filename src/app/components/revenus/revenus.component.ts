import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Revenu, RevenuService } from 'src/app/services/revenu.service';


@Component({
  selector: 'app-revenus',
  templateUrl: './revenus.component.html',
  styleUrls: ['./revenus.component.css']
})
export class RevenusComponent implements OnInit {
  revenus: Revenu[] = [];
  revenuForm: FormGroup;
  editingRevenuId: number | null = null;
  listOfCategorie:any[]=[
    "Salaire",
    "FreeLance",
    "Investissements",
    "Bitcoin",
    "Transfert bancaire",
    "Réseaux sociaux",
    "autres"
  ];

  constructor(
    private revenuService: RevenuService,
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.revenuForm = this.fb.group({
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
      this.getAllRevenus();
    }
  }

  getAllRevenus() {
    this.revenuService.getAllRevenus(this.authService.currentUserEmail).subscribe(
      (data: Revenu[]) => {
        this.revenus = data;
        console.log('Revenus chargées:', this.revenus);
      },
      (error) => {
        console.error('Erreur lors du chargement des revenus', error);
      }
    );
  }

  onSubmit() {
    if (this.revenuForm.valid) {
      if (this.editingRevenuId) {
        this.updateRevenu();
      } else {
        this.addRevenu();
      }
    }
  }

  addRevenu() {
    this.revenuService.addRevenu(this.revenuForm.value).subscribe(
      (response) => {
        console.log('Revenu ajoutée', response);
        this.getAllRevenus();
        this.revenuForm.reset();
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du revenu', error);
      }
    );
  }

  updateRevenu() {
    if (this.editingRevenuId) {
      this.revenuService.updateRevenu(this.editingRevenuId, this.revenuForm.value).subscribe(
        (response) => {
          console.log('Revenu mise à jour', response);
          this.getAllRevenus();
          this.revenuForm.reset();
          this.editingRevenuId = null;
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du revenu', error);
        }
      );
    }
  }

  editRevenu(revenu: Revenu) {
    this.editingRevenuId = revenu.id;
    this.revenuForm.patchValue({
      titre: revenu.titre,
      description: revenu.description,
      categorie: revenu.categorie,
      date: revenu.date,
      montant: revenu.montant
    });
  }

  cancelEdit() {
    this.editingRevenuId = null;
    this.revenuForm.reset();
  }

  deleteRevenu(id: number) {
    this.revenuService.deleteRevenu(id).subscribe(
      () => {
        console.log('Revenu supprimée');
        this.getAllRevenus();
      },
      (error) => {
        console.error('Erreur lors de la suppression du revenu', error);
      }
    );
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}